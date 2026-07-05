import { redirect } from "next/navigation";

// 별도 회원가입 없이 Google OAuth가 자동으로 계정 생성
export default function RegisterPage() {
  redirect("/login");
}
