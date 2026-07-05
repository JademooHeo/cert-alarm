import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function daysUntil(date: Date | string | null | undefined): number | null {
  if (!date) return null;
  const diff = new Date(date).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const CATEGORY_LABEL: Record<string, string> = {
  NATIONAL_TECHNICAL: "국가기술자격",
  NATIONAL_PROFESSIONAL: "국가전문자격",
  PRIVATE_CERTIFIED: "민간공인자격",
};

export const CATEGORY_COLOR: Record<string, string> = {
  NATIONAL_TECHNICAL: "bg-blue-50 text-blue-700 ring-blue-100",
  NATIONAL_PROFESSIONAL: "bg-purple-50 text-purple-700 ring-purple-100",
  PRIVATE_CERTIFIED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
};
