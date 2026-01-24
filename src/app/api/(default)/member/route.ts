import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  try {
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    let result;
    if (id) {
      result = await prisma.member.findUnique({ where: { id } });
      if (!result) return NextResponse.json({ error: "Üye bulunamadı." }, { status: 404 });
    } else {
      result = await prisma.member.findMany({ orderBy: { name: "asc" } });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Üyeler listelenemedi." }, { status: 500 });
  }
}
