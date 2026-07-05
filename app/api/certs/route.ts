import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { CertCategory } from "@prisma/client";

// GET /api/certs?q=검색어&category=NATIONAL_TECHNICAL&page=1
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category") as CertCategory | null;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = 20;

  const where = {
    isActive: true,
    ...(q && {
      OR: [
        { nameKo: { contains: q, mode: "insensitive" as const } },
        { nameEn: { contains: q, mode: "insensitive" as const } },
        { issuingAuthority: { contains: q, mode: "insensitive" as const } },
      ],
    }),
    ...(category && { category }),
  };

  const [items, total] = await Promise.all([
    prisma.certification.findMany({
      where,
      select: {
        id: true,
        nameKo: true,
        nameEn: true,
        category: true,
        subcategory: true,
        grade: true,
        issuingAuthority: true,
        officialUrl: true,
      },
      orderBy: { nameKo: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.certification.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}
