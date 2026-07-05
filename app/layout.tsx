import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { auth } from "@/lib/auth";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "CertAlarm — 자격증 일정 알리미", template: "%s | CertAlarm" },
  description: "500여 종 국가공인 자격증의 접수·시험·발표 일정을 한 곳에서 구독하고 놓치지 마세요.",
  keywords: ["자격증", "자격증 일정", "자격증 알림", "Q-Net", "정보처리기사", "공인중개사"],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth().catch(() => null);

  return (
    <html lang="ko" className={geist.variable}>
      <body className="min-h-screen antialiased">
        <AuthSessionProvider session={session}>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
