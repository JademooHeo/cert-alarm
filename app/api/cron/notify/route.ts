import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, buildNotificationEmail } from "@/lib/email";
import { NotificationType, NotificationStatus } from "@prisma/client";

const EVENT_LABELS: Record<NotificationType, string> = {
  APPLICATION_START: "원서접수 시작",
  APPLICATION_END: "원서접수 마감",
  EXAM_DATE: "시험일",
  RESULT_ANNOUNCEMENT: "합격자 발표",
  SCHEDULE_CHANGE: "일정 변경",
};

// GET /api/cron/notify  — 외부 스케줄러(Vercel Cron, GitHub Actions 등)에서 호출
// Authorization: Bearer <CRON_SECRET> 헤더 필요
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const siteUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  // 발송 대상: scheduledAt이 지금 이전이고 아직 PENDING 상태인 알림
  const pending = await prisma.notificationLog.findMany({
    where: { status: NotificationStatus.PENDING, scheduledAt: { lte: now } },
    include: {
      user: { select: { email: true, name: true } },
      session: {
        include: {
          certification: { select: { nameKo: true, id: true } },
        },
      },
    },
    take: 100, // 배치당 최대 100건
  });

  if (pending.length === 0) {
    return NextResponse.json({ sent: 0, message: "No pending notifications" });
  }

  let sent = 0;
  let failed = 0;

  for (const log of pending) {
    try {
      const { user, session, notificationType } = log;
      const cert = session.certification;

      // 이벤트 날짜 결정
      let eventDate: Date | null = null;
      if (notificationType === NotificationType.APPLICATION_START) eventDate = session.applicationStartAt;
      else if (notificationType === NotificationType.APPLICATION_END) eventDate = session.applicationEndAt;
      else if (notificationType === NotificationType.EXAM_DATE) {
        eventDate = session.examDateWritten ?? session.examDatePractical;
      }
      else if (notificationType === NotificationType.RESULT_ANNOUNCEMENT) eventDate = session.resultAnnouncementAt;

      if (!eventDate) {
        await prisma.notificationLog.update({
          where: { id: log.id },
          data: { status: NotificationStatus.CANCELLED },
        });
        continue;
      }

      const dDays = Math.max(0, Math.round((eventDate.getTime() - now.getTime()) / 86_400_000));
      const certUrl = `${siteUrl}/certs/${encodeURIComponent(cert.id)}`;
      const applicationUrl = session.applicationUrl;

      const emailPayload = buildNotificationEmail({
        userName: user.name ?? "수험생",
        certName: cert.nameKo,
        eventLabel: EVENT_LABELS[notificationType] ?? notificationType,
        eventDate,
        dDays,
        certUrl,
        applicationUrl,
      });
      emailPayload.to = user.email;

      const success = await sendEmail(emailPayload);

      await prisma.notificationLog.update({
        where: { id: log.id },
        data: {
          status: success ? NotificationStatus.SENT : NotificationStatus.FAILED,
          sentAt: success ? new Date() : undefined,
          errorMessage: success ? undefined : "Email send failed",
        },
      });

      if (success) sent++;
      else failed++;
    } catch (err) {
      failed++;
      await prisma.notificationLog.update({
        where: { id: log.id },
        data: {
          status: NotificationStatus.FAILED,
          errorMessage: String(err),
        },
      }).catch(() => {});
    }
  }

  return NextResponse.json({ sent, failed, total: pending.length });
}
