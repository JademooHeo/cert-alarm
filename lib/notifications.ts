import { prisma } from "@/lib/prisma";
import { NotificationChannel, NotificationType } from "@prisma/client";

// 이벤트 날짜 N일 전 오전 9시 KST (UTC 0시)로 scheduledAt 계산
function scheduleAt(eventDate: Date, daysBefore: number): Date {
  const ms = eventDate.getTime() - daysBefore * 86_400_000;
  const d = new Date(ms);
  // 해당 날 KST 09:00 = UTC 00:00
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function getSessionEvents(session: {
  applicationStartAt: Date | null;
  applicationEndAt: Date | null;
  examDateWritten: Date | null;
  examDatePractical: Date | null;
  resultAnnouncementAt: Date | null;
}) {
  type E = { type: NotificationType; date: Date };
  const events: E[] = [];
  if (session.applicationStartAt) events.push({ type: NotificationType.APPLICATION_START, date: session.applicationStartAt });
  if (session.applicationEndAt)   events.push({ type: NotificationType.APPLICATION_END,   date: session.applicationEndAt });
  if (session.examDateWritten)    events.push({ type: NotificationType.EXAM_DATE,          date: session.examDateWritten });
  if (session.examDatePractical)  events.push({ type: NotificationType.EXAM_DATE,          date: session.examDatePractical });
  if (session.resultAnnouncementAt) events.push({ type: NotificationType.RESULT_ANNOUNCEMENT, date: session.resultAnnouncementAt });
  return events;
}

export async function scheduleNotificationsForSubscription(subscriptionId: string): Promise<number> {
  const sub = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: {
      certification: {
        include: {
          sessions: {
            where: {
              OR: [
                { resultAnnouncementAt: { gte: new Date() } },
                { examDateWritten: { gte: new Date() } },
                { applicationStartAt: { gte: new Date() } },
              ],
            },
            orderBy: [{ sessionYear: "asc" }, { sessionRound: "asc" }],
          },
        },
      },
    },
  });
  if (!sub) return 0;

  const now = new Date();

  type LogData = {
    userId: string;
    subscriptionId: string;
    sessionId: string;
    notificationType: NotificationType;
    channel: NotificationChannel;
    scheduledAt: Date;
  };
  const logsToCreate: LogData[] = [];

  for (const session of sub.certification.sessions) {
    for (const { type, date } of getSessionEvents(session)) {
      let daysList: number[];

      switch (type) {
        case NotificationType.APPLICATION_START:  daysList = sub.notifyApplicationStartDays; break;
        case NotificationType.APPLICATION_END:    daysList = sub.notifyApplicationEndDays;   break;
        case NotificationType.EXAM_DATE:          daysList = sub.notifyExamDays;             break;
        case NotificationType.RESULT_ANNOUNCEMENT: daysList = sub.notifyResultOnDay ? [0] : []; break;
        default: daysList = [];
      }

      for (const days of daysList) {
        const scheduledAt = scheduleAt(date, days);
        if (scheduledAt <= now) continue;

        for (const channel of sub.channels) {
          logsToCreate.push({
            userId: sub.userId,
            subscriptionId: sub.id,
            sessionId: session.id,
            notificationType: type,
            channel,
            scheduledAt,
          });
        }
      }
    }
  }

  // 기존 미발송 알림 교체
  await prisma.notificationLog.deleteMany({
    where: { subscriptionId: sub.id, status: "PENDING", scheduledAt: { gt: now } },
  });

  if (logsToCreate.length === 0) return 0;

  const { count } = await prisma.notificationLog.createMany({ data: logsToCreate });
  return count;
}
