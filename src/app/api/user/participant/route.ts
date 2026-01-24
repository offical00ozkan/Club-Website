import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuditLogger } from "@/lib/AuditLogger";
import { participantCreateSchema } from "@/schema/participant";

export async function POST(_req: NextRequest) {
  try {
    const body = await _req.json();
    const data = participantCreateSchema.parse(body);

    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Etkinlik bulunamadı." },
        { status: 404 }
      );
    }

    if (event.code !== data.code) {
      return NextResponse.json(
        { error: "Etkinlik kodu yanlış." },
        { status: 400 }
      );
    }

    // 🔒 Aynı email aynı etkinliğe katılmış mı?
    if (data.email) {
      const existingParticipant = await prisma.participant.findFirst({
        where: {
          eventId: data.eventId,
          email: data.email,
        },
      });

      if (existingParticipant) {
        return NextResponse.json(
          { error: "Bu etkinliğe zaten katıldınız." },
          { status: 409 }
        );
      }
    }

    const participant = await prisma.participant.create({
      data: {
        eventId: data.eventId,
        name: data.name,
        surname: data.surname,
        email: data.email ?? null,
      },
    });

    await AuditLogger(
      _req,
      "CREATE_PARTICIPANT",
      `Katılımcı oluşturuldu: ${data.name} ${data.surname}`
    );

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Katılımcı Eklenemedi." },
      { status: 500 }
    );
  }
}
