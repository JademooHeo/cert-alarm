import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CATEGORY_LABEL, CATEGORY_COLOR, cn } from "@/lib/utils";
import SessionTimeline from "@/components/cert/SessionTimeline";
import SubscribeButton from "@/components/cert/SubscribeButton";

type Props = { params: Promise<{ id: string }> };

async function getCert(rawId: string) {
  const id = decodeURIComponent(rawId);
  return prisma.certification.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: [{ sessionYear: "desc" }, { sessionRound: "desc" }],
      },
      _count: { select: { subscriptions: true } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cert = await getCert(id);
  if (!cert) return { title: "자격증을 찾을 수 없습니다" };
  return {
    title: cert.nameKo,
    description: `${cert.nameKo} 시험 일정, 원서접수, 합격자 발표 정보를 확인하고 알림을 구독하세요`,
  };
}

export default async function CertDetailPage({ params }: Props) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const [cert, authSession] = await Promise.all([
    getCert(rawId),
    auth().catch(() => null),
  ]);

  if (!cert) notFound();

  const userId = authSession?.user?.id ?? null;

  // 현재 유저의 구독 여부 + 알림 설정 확인
  const subscription = userId
    ? await prisma.subscription.findUnique({
        where: { userId_certificationId: { userId, certificationId: id } },
        select: {
          id: true,
          isActive: true,
          notifyApplicationStartDays: true,
          notifyApplicationEndDays: true,
          notifyExamDays: true,
          notifyResultOnDay: true,
        },
      })
    : null;
  const subscriptionId = subscription?.isActive ? subscription.id : null;

  const categoryColor = CATEGORY_COLOR[cert.category] ?? "bg-gray-50 text-gray-600 ring-gray-100";
  const categoryLabel = CATEGORY_LABEL[cert.category] ?? cert.category;

  const now = new Date();

  function nearestFuture<T extends { date: Date; round: number; label: string; url?: string | null }>(
    events: T[]
  ) {
    return events.filter((e) => e.date > now).sort((a, b) => a.date.getTime() - b.date.getTime())[0] ?? null;
  }

  const fmt = (d: Date) => new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(d);

  const upcomingEvents = [
    nearestFuture(cert.sessions.filter((s) => s.applicationStartAt).map((s) => ({ date: s.applicationStartAt!, round: s.sessionRound, label: "접수 시작", url: s.applicationUrl }))),
    nearestFuture(cert.sessions.filter((s) => s.applicationEndAt).map((s) => ({ date: s.applicationEndAt!, round: s.sessionRound, label: "접수 마감", url: s.applicationUrl }))),
    nearestFuture(cert.sessions.filter((s) => s.examDateWritten).map((s) => ({ date: s.examDateWritten!, round: s.sessionRound, label: "필기 시험", url: null }))),
    nearestFuture(cert.sessions.filter((s) => s.examDatePractical).map((s) => ({ date: s.examDatePractical!, round: s.sessionRound, label: "실기 시험", url: null }))),
    nearestFuture(cert.sessions.filter((s) => s.resultAnnouncementAt).map((s) => ({ date: s.resultAnnouncementAt!, round: s.sessionRound, label: "합격 발표", url: null }))),
  ].filter(Boolean)
   .sort((a, b) => a!.date.getTime() - b!.date.getTime()) as { date: Date; round: number; label: string; url?: string | null }[];

  const nearestApplicationUrl = upcomingEvents.find((e) => e.url)?.url ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">홈</Link>
        <span>/</span>
        <Link href="/certs" className="hover:text-gray-600">자격증 찾기</Link>
        <span>/</span>
        <span className="text-gray-700">{cert.nameKo}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 메인 콘텐츠 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 자격증 헤더 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", categoryColor)}>
                {categoryLabel}
              </span>
              {cert.grade && (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                  {cert.grade}
                </span>
              )}
              {cert.subcategory && (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                  {cert.subcategory}
                </span>
              )}
            </div>

            <h1 className="mb-1 text-2xl font-bold text-gray-900">{cert.nameKo}</h1>
            {cert.nameEn && (
              <p className="mb-3 text-sm text-gray-400">{cert.nameEn}</p>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{cert.issuingAuthority}</span>
              </div>
              {cert.baseLaw && (
                <div className="flex items-center gap-1.5">
                  <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{cert.baseLaw}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
                <span>{cert._count.subscriptions.toLocaleString()}명 구독 중</span>
              </div>
            </div>

            {cert.officialUrl && (
              <div className="mt-4">
                <a
                  href={cert.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                  공식 사이트 바로가기
                  <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* 시험 일정 */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-900">회차별 시험 일정</h2>
            <SessionTimeline sessions={cert.sessions} />
          </div>
        </div>

        {/* 사이드바 */}
        <div className="space-y-4">
          {/* 구독 카드 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-1 font-semibold text-gray-900">일정 알림 구독</h3>
            <p className="mb-4 text-xs text-gray-500">
              접수 시작·마감·시험일·발표일을 이메일로 미리 알려드립니다
            </p>
            <SubscribeButton
              certificationId={id}
              certNameKo={cert.nameKo}
              isLoggedIn={!!userId}
              initialSubscriptionId={subscriptionId}
              initialSettings={subscription?.isActive ? {
                notifyApplicationStartDays: subscription.notifyApplicationStartDays,
                notifyApplicationEndDays: subscription.notifyApplicationEndDays,
                notifyExamDays: subscription.notifyExamDays,
                notifyResultOnDay: subscription.notifyResultOnDay,
              } : undefined}
            />
          </div>

          {/* 다가오는 일정 요약 */}
          {upcomingEvents.length > 0 && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-500">
                다가오는 일정
              </p>
              <ul className="space-y-2">
                {upcomingEvents.map((e) => (
                  <li key={e.label} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-blue-700 shrink-0">
                      <span className="font-medium">{e.label}</span>
                      <span className="ml-1 text-blue-400 text-xs">({e.round}회)</span>
                    </span>
                    <span className="text-blue-900 font-semibold tabular-nums">{fmt(e.date)}</span>
                  </li>
                ))}
              </ul>
              {nearestApplicationUrl && (
                <a
                  href={nearestApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                  원서 접수하기
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* 면책 고지 */}
          <p className="text-xs leading-relaxed text-gray-400">
            ⚠️ 본 서비스의 일정은 참고용입니다. 접수 전 반드시{" "}
            {cert.officialUrl ? (
              <a href={cert.officialUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                시행기관 공식 사이트
              </a>
            ) : (
              "시행기관 공식 사이트"
            )}
            에서 최종 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
