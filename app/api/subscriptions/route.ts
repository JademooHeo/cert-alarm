import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { scheduleNotificationsForSubscription } from "@/lib/notifications";

// GET /api/subscriptions  — 내 구독 목록
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const subs = await prisma.subscription.findMany({
    where: { userId: session.user.id, isActive: true },
    include: {
      certification: {
        include: {
          sessions: {
            orderBy: [{ sessionYear: "desc" }, { sessionRound: "asc" }],
            take: 3,
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(subs);
}

// POST /api/subscriptions  — 구독 생성
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    certificationId,
    notifyApplicationStartDays = [3],
    notifyApplicationEndDays = [1],
    notifyExamDays = [7],
    notifyResultOnDay = true,
    channels = ["EMAIL"],
  } = body;

  if (!certificationId) {
    return NextResponse.json({ error: "certificationId is required" }, { status: 400 });
  }

  const sub = await prisma.subscription.upsert({
    where: { userId_certificationId: { userId: session.user.id, certificationId } },
    create: {
      userId: session.user.id,
      certificationId,
      notifyApplicationStartDays,
      notifyApplicationEndDays,
      notifyExamDays,
      notifyResultOnDay,
      channels,
      isActive: true,
    },
    update: {
      notifyApplicationStartDays,
      notifyApplicationEndDays,
      notifyExamDays,
      notifyResultOnDay,
      channels,
      isActive: true,
    },
    include: { certification: true },
  });

  // 알림 예약 (비동기 — 실패해도 응답에 영향 없음)
  scheduleNotificationsForSubscription(sub.id).catch(console.error);

  return NextResponse.json(sub, { status: 201 });
}
