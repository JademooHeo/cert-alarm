import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { scheduleNotificationsForSubscription } from "@/lib/notifications";

// PATCH /api/subscriptions/:id  — 알림 설정 변경
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const existing = await prisma.subscription.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      notifyApplicationStartDays: body.notifyApplicationStartDays,
      notifyApplicationEndDays: body.notifyApplicationEndDays,
      notifyExamDays: body.notifyExamDays,
      notifyResultOnDay: body.notifyResultOnDay,
      channels: body.channels,
    },
  });

  // 알림 재예약 (설정 변경 반영)
  scheduleNotificationsForSubscription(id).catch(console.error);

  return NextResponse.json(updated);
}

// DELETE /api/subscriptions/:id  — 구독 해제
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.subscription.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.subscription.update({ where: { id }, data: { isActive: false } });

  return new NextResponse(null, { status: 204 });
}
