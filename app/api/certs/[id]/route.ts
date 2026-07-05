import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/certs/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cert = await prisma.certification.findUnique({
    where: { id },
    include: {
      sessions: {
        orderBy: [{ sessionYear: "desc" }, { sessionRound: "desc" }],
        take: 10,
      },
      _count: { select: { subscriptions: true } },
    },
  });

  if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(cert);
}
