import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "noreply@certalarm.kr";

function createTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const transporter = createTransporter();

  if (!transporter) {
    // SMTP 미설정 시 콘솔에 출력 (개발 모드)
    console.log("=== [EMAIL] SMTP not configured — printing to console ===");
    console.log(`To: ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Body: ${payload.text ?? payload.html}`);
    console.log("==========================================================");
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"CertAlarm" <${EMAIL_FROM}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });
    return true;
  } catch (err) {
    console.error("[EMAIL] Failed to send:", err);
    return false;
  }
}

// ─── 이메일 템플릿 ────────────────────────────────────────────────────────────

type NotificationEmailParams = {
  userName: string;
  certName: string;
  eventLabel: string;
  eventDate: Date;
  dDays: number;
  certUrl: string;
  applicationUrl?: string | null;
};

function formatKoreanDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Seoul",
  });
}

export function buildNotificationEmail(params: NotificationEmailParams): EmailPayload {
  const { userName, certName, eventLabel, eventDate, dDays, certUrl, applicationUrl } = params;

  const dateStr = formatKoreanDate(eventDate);
  const dDayLabel = dDays === 0 ? "오늘" : `D-${dDays}`;
  const subject = `[CertAlarm] ${certName} ${eventLabel} ${dDayLabel}`;

  const actionButton = applicationUrl
    ? `<a href="${applicationUrl}" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">원서 접수 바로가기</a>`
    : `<a href="${certUrl}" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">일정 상세 보기</a>`;

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Apple SD Gothic Neo',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
        <!-- 헤더 -->
        <tr><td style="background:#2563eb;padding:24px 32px;">
          <span style="color:#fff;font-size:20px;font-weight:700;">CertAlarm</span>
          <span style="color:#bfdbfe;font-size:14px;margin-left:8px;">자격증 일정 알리미</span>
        </td></tr>
        <!-- 바디 -->
        <tr><td style="padding:32px;">
          <p style="margin:0 0 8px;color:#6b7280;font-size:14px;">안녕하세요, ${userName}님</p>
          <h1 style="margin:0 0 24px;font-size:22px;color:#111827;line-height:1.4;">
            <span style="color:#2563eb;">${certName}</span><br>
            ${eventLabel}이 <strong>${dDayLabel}</strong> 입니다
          </h1>

          <div style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#6b7280;font-size:13px;padding-bottom:8px;">일정</td>
                <td style="color:#111827;font-size:15px;font-weight:600;text-align:right;padding-bottom:8px;">${dateStr}</td>
              </tr>
              <tr>
                <td style="color:#6b7280;font-size:13px;">구분</td>
                <td style="color:#2563eb;font-size:15px;font-weight:600;text-align:right;">${eventLabel}</td>
              </tr>
            </table>
          </div>

          <div style="text-align:center;">
            ${actionButton}
          </div>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">
          <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
            이 알림은 CertAlarm에서 <strong>${certName}</strong>을 구독하셨기 때문에 발송되었습니다.<br>
            알림 설정 변경은 <a href="${certUrl}" style="color:#2563eb;">자격증 상세 페이지</a>에서 가능합니다.
          </p>
        </td></tr>
        <!-- 푸터 -->
        <tr><td style="background:#f9fafb;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#9ca3af;font-size:12px;">CertAlarm · 자격증 일정 알리미</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `[CertAlarm] ${certName} ${eventLabel} ${dDayLabel}\n\n안녕하세요, ${userName}님!\n\n${certName}의 ${eventLabel}이 ${dDayLabel}(${dateStr})입니다.\n\n자세히 보기: ${certUrl}`;

  return { to: "", subject, html, text };
}
