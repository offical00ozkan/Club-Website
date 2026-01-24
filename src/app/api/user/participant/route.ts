import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuditLogger } from "@/lib/AuditLogger";
import { participantCreateSchema } from "@/schema/participant";

export async function POST(_req: NextRequest) {

  try {

    const body = await _req.json();
    const data = participantCreateSchema.parse(body);

    const event = await prisma.event.findUnique({ where: { id: data.eventId } });
    if (!event) return NextResponse.json({ error: "Etkinlik bulunamadı." }, { status: 404 });
    if (event.code !== data.code) return NextResponse.json({ error: "Etkinlik kodu yanlış." }, { status: 400 });

    await AuditLogger(_req, "CREATE_PARTICIPANT", `Katılımc Oluşturuldu: ${data.name} ${data.surname}`);

    const participant = await prisma.participant.create({
      data: {
        eventId: data.eventId,
        email: data.email,
        name: data.name,
        surname: data.surname,
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Katılımcı oluşturulamadı." }, { status: 500 });
  }
}
