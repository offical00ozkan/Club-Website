import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuditLogger } from "@/lib/AuditLogger";

export async function GET(_req: NextRequest) {
  try {

    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    let result;
    if (id) {
      result = await prisma.participant.findUnique({
        where: { id },
        include: { event: true },
      });
      if (!result) return NextResponse.json({ error: "Participant not found" }, { status: 404 });
      
    } else {
      result = await prisma.participant.findMany({
        include: { event: true },
        orderBy: { joinedAt: "desc" },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Katılımcılar alınamadı" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest) {
  try {

    const url = new URL(_req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Katılımcı ID gerekli." }, { status: 400 });

    const deletedParticipant = await prisma.participant.delete({ where: { id } });

    await AuditLogger(_req, "DELETE_PARTICIPANT", `Katılımcı silindi: ${deletedParticipant.name} ${deletedParticipant.surname}`);

    return NextResponse.json({ message: "Katılımcı başarıyla silindi.", deletedParticipant });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Katılımcı silinemedi." }, { status: 500 });
  }
}
