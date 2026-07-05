import type {
  Certification,
  ExamSession,
  Subscription,
  NotificationLog,
  CertCategory,
  NotificationChannel,
  NotificationType,
  NotificationStatus,
} from "@prisma/client";

export type {
  Certification,
  ExamSession,
  Subscription,
  NotificationLog,
  CertCategory,
  NotificationChannel,
  NotificationType,
  NotificationStatus,
};

export type CertificationWithSessions = Certification & {
  sessions: ExamSession[];
};

export type SubscriptionWithCert = Subscription & {
  certification: CertificationWithSessions;
};

// 대시보드에서 "다가오는 일정" 카드용
export type UpcomingEvent = {
  certificationId: string;
  certNameKo: string;
  sessionYear: number;
  sessionRound: number;
  eventType: NotificationType;
  eventDate: Date;
  applicationUrl: string | null;
};
