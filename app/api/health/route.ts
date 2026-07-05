import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? "set" : "NOT SET",
    prefix: process.env.DATABASE_URL?.slice(0, 40) ?? "null",
  });
}
