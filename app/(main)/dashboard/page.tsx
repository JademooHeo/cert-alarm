import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import CertCard from "@/components/cert/CertCard";
import { formatDate, daysUntil, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "내 대시보드" };

export default async function DashboardPage() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login");

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id, isActive: true },
    include: {
      certification: {
        include: {
          sessions: {
            where: {
              OR: [
                { applicationStartAt: { gte: new Date() } },
                { examDateWritten: { gte: new Date() } },
                { resultAnnouncementAt: { gte: new Date() } },
              ],
            },
            orderBy: [{ sessionYear: "asc" }, { sessionRound: "asc" }],
            take: 1,
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 다가오는 이벤트 목록 생성
  type UpcomingItem = {
    certName: string;
    certId: string;
    label: string;
    date: Date;
    dDay: number;
  };

  const upcoming: UpcomingItem[] = [];
  for (const sub of subscriptions) {
    const s = sub.certification.sessions[0];
    if (!s) continue;
    const events = [
      { label: "원서접수 시작", date: s.applicationStartAt },
      { label: "원서접수 마감", date: s.applicationEndAt },
      { label: "필기시험", date: s.examDateWritten },
      { label: "실기시험", date: s.examDatePractical },
      { label: "합격자 발표", date: s.resultAnnouncementAt },
    ];
    for (const e of events) {
      if (!e.date) continue;
      const d = daysUntil(e.date);
      if (d !== null && d >= 0 && d <= 30) {
        upcoming.push({
          certName: sub.certification.nameKo,
          certId: sub.certificationId,
          label: e.label,
          date: e.date,
          dDay: d,
        });
      }
    }
  }
  upcoming.sort((a, b) => a.dDay - b.dDay);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* 인사 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          안녕하세요, {session.user.name?.split(" ")[0] ?? "회원"}님 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">구독 중인 자격증 일정을 확인하세요</p>
      </div>

      {subscriptions.length === 0 ? (
        /* 구독 없을 때 */
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="font-semibold text-gray-700">아직 구독한 자격증이 없어요</p>
          <p className="mt-1 text-sm text-gray-400">관심 자격증을 찾아 구독하면 일정 알림을 받을 수 있어요</p>
          <Link
            href="/certs"
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            자격증 찾아보기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 다가오는 일정 */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-gray-900">30일 내 다가오는 일정</h2>
            {upcoming.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-white px-5 py-8 text-center text-sm text-gray-400">
                30일 내 예정된 일정이 없습니다
              </div>
            ) : (
              <div className="space-y-2">
                {upcoming.map((item, i) => (
                  <Link
                    key={i}
                    href={`/certs/${encodeURIComponent(item.certId)}`}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:border-blue-200 hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.certName}</p>
                      <p className="text-sm text-gray-500">{item.label} · {formatDate(item.date)}</p>
                    </div>
                    <span className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                      item.dDay === 0 ? "bg-red-100 text-red-600" :
                      item.dDay <= 3 ? "bg-orange-100 text-orange-600" :
                      item.dDay <= 7 ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-600"
                    )}>
                      {item.dDay === 0 ? "오늘" : `D-${item.dDay}`}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 구독 중인 자격증 */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-gray-900">구독 중 ({subscriptions.length})</h2>
              <Link href="/certs" className="text-xs text-blue-600 hover:underline">+ 추가</Link>
            </div>
            <div className="space-y-2">
              {subscriptions.map((sub) => (
                <CertCard
                  key={sub.id}
                  id={sub.certificationId}
                  nameKo={sub.certification.nameKo}
                  nameEn={sub.certification.nameEn}
                  category={sub.certification.category}
                  subcategory={sub.certification.subcategory}
                  grade={sub.certification.grade}
                  issuingAuthority={sub.certification.issuingAuthority}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
