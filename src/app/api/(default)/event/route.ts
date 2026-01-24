import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  try {
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    let result;
    if (id) {
      result = await prisma.event.findUnique({
        where: { id },
        include: { participants: true },
      });
      if (!result) return NextResponse.json({ error: "Etkinlik bulunamadı." }, { status: 404 });
    } else {
      result = await prisma.event.findMany({
        include: { participants: true },
        orderBy: { date: "desc" },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Etkinlikler listelenemedi." }, { status: 500 });
  }
}