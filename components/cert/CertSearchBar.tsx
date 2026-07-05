"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type Props = {
  defaultValue?: string;
  size?: "default" | "lg";
  className?: string;
};

export default function CertSearchBar({
  defaultValue = "",
  size = "default",
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/certs?${params.toString()}`);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setValue("");
      inputRef.current?.blur();
    }
  }

  const isLg = size === "lg";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100",
          isLg ? "px-4 py-3" : "px-3 py-2"
        )}
      >
        <svg
          className={cn("shrink-0 text-gray-400", isLg ? "size-5" : "size-4")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="자격증명 또는 시행기관 검색 (예: 정보처리기사, Q-Net)"
          className={cn(
            "flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400",
            isLg ? "text-base" : "text-sm"
          )}
          aria-label="자격증 검색"
        />

        {value && (
          <button
            type="button"
            onClick={() => { setValue(""); inputRef.current?.focus(); }}
            className="shrink-0 text-gray-300 hover:text-gray-500"
            aria-label="검색어 지우기"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "shrink-0 rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50",
            isLg ? "px-5 py-2 text-sm" : "px-3 py-1 text-xs"
          )}
        >
          {isPending ? "검색 중…" : "검색"}
        </button>
      </div>
    </form>
  );
}
