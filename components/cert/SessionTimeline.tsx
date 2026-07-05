import type { ExamSession } from "@prisma/client";
import { formatDate, daysUntil, cn } from "@/lib/utils";

type Event = {
  label: string;
  date: Date | null;
  sublabel?: string;
};

function getEvents(s: ExamSession): Event[] {
  return [
    { label: "원서접수", date: s.applicationStartAt, sublabel: s.applicationEndAt ? `~ ${formatDate(s.applicationEndAt)}` : undefined },
    ...(s.addlApplicationStartAt ? [{ label: "추가접수", date: s.addlApplicationStartAt, sublabel: s.addlApplicationEndAt ? `~ ${formatDate(s.addlApplicationEndAt)}` : undefined }] : []),
    ...(s.examDateWritten ? [{ label: "필기시험", date: s.examDateWritten }] : []),
    ...(s.examDatePractical ? [{ label: "실기시험", date: s.examDatePractical }] : []),
    ...(s.examDateInterview ? [{ label: "면접", date: s.examDateInterview }] : []),
    { label: "합격자 발표", date: s.resultAnnouncementAt },
  ].filter((e) => e.date !== null);
}

function EventBadge({ date }: { date: Date }) {
  const days = daysUntil(date);
  if (days === null) return null;
  if (days < 0) return <span className="text-xs text-gray-400">완료</span>;
  if (days === 0) return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">오늘</span>;
  if (days <= 3) return <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">D-{days}</span>;
  if (days <= 14) return <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">D-{days}</span>;
  return <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">D-{days}</span>;
}

type Props = {
  sessions: ExamSession[];
};

export default function SessionTimeline({ sessions }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
        등록된 시험 회차 정보가 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sessions.map((session) => {
        const events = getEvents(session);
        const now = Date.now();
        const isPast = session.resultAnnouncementAt && session.resultAnnouncementAt.getTime() < now;

        return (
          <div
            key={session.id}
            className={cn(
              "rounded-xl border bg-white",
              isPast ? "border-gray-100 opacity-60" : "border-gray-200 shadow-sm"
            )}
          >
            {/* 회차 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {session.sessionYear}년 제{session.sessionRound}회
                </span>
                {isPast && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">종료</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                {session.examFee && (
                  <span>응시료 {session.examFee.toLocaleString()}원</span>
                )}
                {session.announcementUrl && (
                  <a
                    href={session.announcementUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    공고 보기
                    <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* 일정 타임라인 */}
            <div className="px-5 py-4">
              <ol className="relative border-l border-gray-100 pl-6 space-y-4">
                {events.map((event, i) => {
                  const isPastEvent = event.date && event.date.getTime() < now;
                  return (
                    <li key={i} className="relative">
                      <div
                        className={cn(
                          "absolute -left-[25px] top-1 size-3 rounded-full border-2 bg-white",
                          isPastEvent ? "border-gray-300" : "border-blue-500"
                        )}
                      />
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className={cn("text-sm font-medium", isPastEvent ? "text-gray-400" : "text-gray-800")}>
                          {event.label}
                        </span>
                        <span className={cn("text-sm", isPastEvent ? "text-gray-400" : "text-gray-600")}>
                          {formatDate(event.date)}
                          {event.sublabel && (
                            <span className="ml-1 text-xs text-gray-400">{event.sublabel}</span>
                          )}
                        </span>
                        {!isPastEvent && event.date && <EventBadge date={event.date} />}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* 시험 과목 */}
            {session.subjects && (
              <div className="border-t border-gray-100 px-5 py-3">
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-gray-600">시험과목 </span>
                  {session.subjects}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
