"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-600">CertAlarm</span>
          <span className="hidden text-xs text-gray-400 sm:inline">자격증 일정 알리미</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/certs"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              pathname.startsWith("/certs")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            자격증 찾기
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              내 대시보드
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? ""}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {session.user?.name?.[0] ?? session.user?.email?.[0] ?? "U"}
                  </div>
                )}
                <svg className="size-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-20 mt-1 w-52 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      내 대시보드
                    </Link>
                    <Link
                      href="/settings/notifications"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      알림 설정
                    </Link>
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        로그아웃
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                로그인
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                시작하기
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
