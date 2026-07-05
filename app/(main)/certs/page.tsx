import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { CertCategory } from "@prisma/client";
import CertCard from "@/components/cert/CertCard";
import CertSearchBar from "@/components/cert/CertSearchBar";
import { cn, CATEGORY_LABEL, CATEGORY_COLOR } from "@/lib/utils";
import Link from "next/link";

const CATEGORIES = [
  { label: "전체", value: "" },
  { label: "국가기술자격", value: "NATIONAL_TECHNICAL" },
  { label: "국가전문자격", value: "NATIONAL_PROFESSIONAL" },
  { label: "민간공인자격", value: "PRIVATE_CERTIFIED" },
] as const;

const PAGE_SIZE = 20;

type SearchParams = Promise<{
  q?: string;
  category?: string;
  page?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" 검색 결과` : "자격증 찾기",
  };
}

async function CertResults({
  q,
  category,
  page,
}: {
  q: string;
  category: string;
  page: number;
}) {
  const where = {
    isActive: true,
    ...(q && {
      OR: [
        { nameKo: { contains: q, mode: "insensitive" as const } },
        { nameEn: { contains: q, mode: "insensitive" as const } },
        { issuingAuthority: { contains: q, mode: "insensitive" as const } },
        { subcategory: { contains: q, mode: "insensitive" as const } },
      ],
    }),
    ...(category && { category: category as CertCategory }),
  };

  const [certs, total] = await Promise.all([
    prisma.certification.findMany({
      where,
      select: {
        id: true, nameKo: true, nameEn: true,
        category: true, subcategory: true,
        grade: true, issuingAuthority: true,
      },
      orderBy: { nameKo: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.certification.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (certs.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <svg className="mb-4 size-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium text-gray-600">
          {q ? `"${q}"에 대한 검색 결과가 없습니다` : "자격증이 없습니다"}
        </p>
        {q && (
          <p className="mt-1 text-sm text-gray-400">
            다른 검색어를 사용하거나 카테고리 필터를 변경해 보세요
          </p>
        )}
      </div>
    );
  }

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    params.set("page", String(p));
    return `/certs?${params.toString()}`;
  };

  return (
    <>
      <p className="mb-4 text-sm text-gray-500">
        총 <span className="font-semibold text-gray-900">{total.toLocaleString()}</span>개의 자격증
        {q && <> — <span className="font-medium">"{q}"</span> 검색 결과</>}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {certs.map((cert) => (
          <CertCard key={cert.id} {...cert} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          {page > 1 && (
            <Link
              href={buildPageUrl(page - 1)}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              이전
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | "…")[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="px-2 text-gray-400">…</span>
              ) : (
                <Link
                  key={p}
                  href={buildPageUrl(p as number)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm",
                    p === page
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {p}
                </Link>
              )
            )}
          {page < totalPages && (
            <Link
              href={buildPageUrl(page + 1)}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              다음
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default async function CertsPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "", category = "", page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  const buildCategoryUrl = (cat: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    return `/certs?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">자격증 찾기</h1>
        <Suspense>
          <CertSearchBar defaultValue={q} />
        </Suspense>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.value;
          return (
            <Link
              key={cat.value}
              href={buildCategoryUrl(cat.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium transition",
                isActive
                  ? cat.value
                    ? cn("border-transparent", CATEGORY_COLOR[cat.value])
                    : "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <Suspense key={`${q}-${category}-${page}`} fallback={<ResultsSkeleton />}>
        <CertResults q={q} category={category} page={page} />
      </Suspense>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl bg-white border border-gray-100" />
      ))}
    </div>
  );
}
