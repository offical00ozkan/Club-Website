import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {

    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "email zorunludur." },
        { status: 400 }
      );
    }


    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Kullanıcı veya email bulunamadı." },
        { status: 404 }
      );
    }

    const participations = await prisma.participant.findMany({
      where: {
        email: user.email,
      },
      include: {
        event: true,
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    const events = participations.map((p: { id: string; joinedAt: Date; event: unknown }) => ({
      participantId: p.id,
      joinedAt: p.joinedAt,
      event: p.event,
    }));

    return NextResponse.json({
      user,
      totalEvents: events.length,
      events,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Kullanıcının etkinlikleri getirilemedi." },
      { status: 500 }
    );
  }
}
