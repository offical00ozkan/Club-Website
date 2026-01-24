import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const audits = await prisma.audit.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audits);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Audit logları listelenemedi." },
      { status: 500 }
    );
  }
}