"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    setLoading(true);
    await signIn("google", { callbackUrl: next });
  }

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked: "이미 다른 방법으로 가입된 이메일입니다.",
    OAuthCallbackError: "Google 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.",
    Default: "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.",
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900">CertAlarm 시작하기</h1>
          <p className="mt-1 text-sm text-gray-500">
            자격증 일정을 구독하고 접수일을 놓치지 마세요
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessages[error] ?? errorMessages.Default}
          </div>
        )}

        {/* Google 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg className="size-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <GoogleIcon />
          )}
          {loading ? "로그인 중…" : "Google로 계속하기"}
        </button>

        {/* 안내 텍스트 */}
        <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
          계속하면 CertAlarm의{" "}
          <a href="#" className="underline hover:text-gray-600">이용약관</a>과{" "}
          <a href="#" className="underline hover:text-gray-600">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
        </p>
      </div>

      {/* 하단 안내 */}
      <p className="mt-6 text-center text-xs text-gray-400">
        처음 방문이신가요? Google 로그인 시 자동으로 계정이 생성됩니다.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
