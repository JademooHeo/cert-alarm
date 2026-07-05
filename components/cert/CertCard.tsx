import Link from "next/link";
import { cn, CATEGORY_LABEL, CATEGORY_COLOR } from "@/lib/utils";

type Props = {
  id: string;
  nameKo: string;
  nameEn?: string | null;
  category: string;
  subcategory?: string | null;
  grade?: string | null;
  issuingAuthority: string;
  className?: string;
};

export default function CertCard({
  id,
  nameKo,
  nameEn,
  category,
  subcategory,
  grade,
  issuingAuthority,
  className,
}: Props) {
  return (
    <Link
      href={`/certs/${id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
            CATEGORY_COLOR[category] ?? "bg-gray-50 text-gray-600 ring-gray-100"
          )}
        >
          {CATEGORY_LABEL[category] ?? category}
        </span>
        {grade && (
          <span className="text-xs text-gray-400">{grade}</span>
        )}
      </div>

      <div>
        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {nameKo}
        </p>
        {nameEn && (
          <p className="mt-0.5 text-xs text-gray-400">{nameEn}</p>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <svg className="size-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span className="truncate">{issuingAuthority}</span>
        {subcategory && (
          <>
            <span>·</span>
            <span>{subcategory}</span>
          </>
        )}
      </div>
    </Link>
  );
}
