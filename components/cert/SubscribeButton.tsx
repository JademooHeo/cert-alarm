"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type NotifyDays = number[];

type Settings = {
  notifyApplicationStartDays: NotifyDays;
  notifyApplicationEndDays: NotifyDays;
  notifyExamDays: NotifyDays;
  notifyResultOnDay: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  notifyApplicationStartDays: [3],
  notifyApplicationEndDays: [1],
  notifyExamDays: [7],
  notifyResultOnDay: true,
};

type Props = {
  certificationId: string;
  certNameKo: string;
  isLoggedIn: boolean;
  initialSubscriptionId?: string | null;
  initialSettings?: Partial<Settings>;
};

function DaysToggle({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: number[];
  selected: number[];
  onChange: (v: number[]) => void;
}) {
  function toggle(day: number) {
    if (selected.includes(day)) {
      onChange(selected.filter((d) => d !== day));
    } else {
      onChange([...selected, day].sort((a, b) => b - a));
    }
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="min-w-0 shrink-0 text-xs text-gray-600">{label}</span>
      <div className="flex gap-1">
        {options.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => toggle(day)}
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium transition",
              selected.includes(day)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            {day === 0 ? "당일" : `${day}일전`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SubscribeButton({
  certificationId,
  certNameKo,
  isLoggedIn,
  initialSubscriptionId = null,
  initialSettings,
}: Props) {
  const router = useRouter();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(initialSubscriptionId);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState<Settings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });

  const isSubscribed = !!subscriptionId;

  function handleSubscribe() {
    if (!isLoggedIn) {
      router.push(`/login?next=/certs/${encodeURIComponent(certificationId)}`);
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificationId, ...settings }),
      });
      if (res.ok) {
        const data = await res.json();
        setSubscriptionId(data.id);
        setShowSettings(true);
      } else {
        setError("구독에 실패했습니다");
      }
    });
  }

  function handleUnsubscribe() {
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/subscriptions/${subscriptionId}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        setSubscriptionId(null);
        setShowSettings(false);
      } else {
        setError("구독 해제에 실패했습니다");
      }
    });
  }

  function handleSaveSettings() {
    if (!subscriptionId) return;
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError("설정 저장에 실패했습니다");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {/* 메인 버튼 */}
      {isSubscribed ? (
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings((v) => !v)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            구독 중
            <svg className={cn("size-3 transition", showSettings && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={handleUnsubscribe}
            disabled={isPending}
            className="rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
            title="구독 해제"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? (
            <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          )}
          {isPending ? "처리 중…" : isLoggedIn ? "알림 구독하기" : "로그인하고 알림받기"}
        </button>
      )}

      {/* 알림 설정 패널 */}
      {isSubscribed && showSettings && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">알림 시점 설정</p>
          <div className="flex flex-col gap-3">
            <DaysToggle
              label="원서접수 시작"
              options={[7, 3, 1]}
              selected={settings.notifyApplicationStartDays}
              onChange={(v) => setSettings((s) => ({ ...s, notifyApplicationStartDays: v }))}
            />
            <DaysToggle
              label="원서접수 마감"
              options={[3, 1]}
              selected={settings.notifyApplicationEndDays}
              onChange={(v) => setSettings((s) => ({ ...s, notifyApplicationEndDays: v }))}
            />
            <DaysToggle
              label="시험일"
              options={[14, 7, 3, 1]}
              selected={settings.notifyExamDays}
              onChange={(v) => setSettings((s) => ({ ...s, notifyExamDays: v }))}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">합격자 발표일</span>
              <button
                type="button"
                onClick={() => setSettings((s) => ({ ...s, notifyResultOnDay: !s.notifyResultOnDay }))}
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-medium transition",
                  settings.notifyResultOnDay
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                {settings.notifyResultOnDay ? "당일 알림 ON" : "당일 알림 OFF"}
              </button>
            </div>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={isPending}
            className="mt-4 w-full rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
          >
            {isPending ? "저장 중…" : saved ? "저장됨!" : "설정 저장"}
          </button>
          <p className="mt-2 text-center text-xs text-gray-400">
            이메일로 발송됩니다 · 오전 9시 기준
          </p>
        </div>
      )}

      {!isLoggedIn && (
        <p className="text-center text-xs text-gray-400">무료 가입 후 구독할 수 있습니다</p>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}
