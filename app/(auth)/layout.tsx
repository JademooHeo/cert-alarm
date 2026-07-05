import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex h-14 items-center px-6">
        <Link href="/" className="text-lg font-bold text-blue-600">
          CertAlarm
        </Link>
      </div>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>
      <footer className="py-6 text-center text-xs text-gray-400">
        © 2026 CertAlarm &nbsp;·&nbsp;
        <Link href="#" className="hover:underline">이용약관</Link>
        &nbsp;·&nbsp;
        <Link href="#" className="hover:underline">개인정보처리방침</Link>
      </footer>
    </div>
  );
}
