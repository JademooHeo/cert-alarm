import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import CertCard from "@/components/cert/CertCard";
import CertSearchBar from "@/components/cert/CertSearchBar";
import { CATEGORY_LABEL, CATEGORY_COLOR, cn } from "@/lib/utils";

const POPULAR_CERT_IDS = [
  "seed-정보처리기사",
  "seed-컴퓨터활용능력 1급",
  "seed-전기기사",
  "seed-공인중개사",
  "seed-한국사능력검정시험 심화",
  "seed-SQLD",
  "seed-공인회계사",
  "seed-빅데이터분석기사",
];

const CATEGORY_FILTERS = [
  { label: "국가기술자격", value: "NATIONAL_TECHNICAL" },
  { label: "국가전문자격", value: "NATIONAL_PROFESSIONAL" },
  { label: "민간공인자격", value: "PRIVATE_CERTIFIED" },
];

async function PopularCerts() {
  const certs = await prisma.certification.findMany({
    where: { id: { in: POPULAR_CERT_IDS }, isActive: true },
    select: {
      id: true, nameKo: true, nameEn: true,
      category: true, subcategory: true,
      grade: true, issuingAuthority: true,
    },
    orderBy: { nameKo: "asc" },
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {certs.map((cert) => (
        <CertCard key={cert.id} {...cert} />
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 px-4 pb-20 pt-16 text-white sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium text-blue-200">
            500여 종 국가공인 자격증 일정 알리미
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            자격증 접수일,<br className="sm:hidden" /> 이제 놓치지 마세요
          </h1>
          <p className="mb-8 text-base text-blue-100 sm:text-lg">
            원하는 자격증을 구독하면 접수 시작·마감·시험일·발표일을
            <br className="hidden sm:block" /> 이메일로 미리 알려드립니다
          </p>

          <div className="mx-auto max-w-xl">
            <Suspense>
              <CertSearchBar size="lg" />
            </Suspense>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {CATEGORY_FILTERS.map((c) => (
              <Link
                key={c.value}
                href={`/certs?category=${c.value}`}
                className="rounded-full bg-blue-500/40 px-3 py-1 text-xs font-medium text-blue-100 hover:bg-blue-500/60 transition"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "자격증 검색",
                desc: "자격증명, 카테고리, 시행기관으로 원하는 자격증을 찾습니다",
                icon: (
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "일정 구독",
                desc: "접수 시작 N일 전, 마감 전, 시험일 전 등 원하는 시점을 선택합니다",
                icon: (
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "알림 수신",
                desc: "설정한 시점에 이메일로 알림을 받고, Q-Net 접수 페이지로 바로 이동합니다",
                icon: (
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {icon}
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-500">
                  {step}
                </p>
                <h3 className="mb-1 font-semibold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular certs */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-gray-900">인기 자격증</h2>
            <Link href="/certs" className="text-sm font-medium text-blue-600 hover:underline">
              전체 보기 →
            </Link>
          </div>
          <Suspense fallback={<CertCardSkeleton count={8} />}>
            <PopularCerts />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-auto bg-blue-600 px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-2xl font-bold">지금 바로 시작하세요</h2>
          <p className="mb-6 text-blue-100">
            무료로 가입하고 원하는 자격증 일정을 구독하세요
          </p>
          <Link
            href="/register"
            className="inline-block rounded-lg bg-white px-6 py-2.5 font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white px-4 py-6 text-center text-xs text-gray-400 sm:px-6">
        © 2026 CertAlarm. 본 서비스의 자격증 일정은 참고용이며, 정확한 일정은 시행기관 공식 사이트를 확인하세요.
      </footer>
    </div>
  );
}

function CertCardSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl border border-gray-100 bg-white" />
      ))}
    </div>
  );
}
