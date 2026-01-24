import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuditLogger } from "@/lib/AuditLogger";
import { eventCreateSchema, eventUpdateSchema } from "@/schema/event";

export async function POST(_req: NextRequest) {
  try {
    const body = await _req.json();
    const parsed = eventCreateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });

    const { title, location, description, date, isActive, image } = parsed.data;

    const event = await prisma.event.create({
      data: {
        title,
        location: location ?? "",
        description: description ?? "",
        date: new Date(date),
        isActive: isActive ?? true,
        image: image ?? "",
      },
    });

    await AuditLogger(_req, "CREATE_EVENT", `Etkinlik oluşturuldu: ${event.title}`);

    return NextResponse.json(event);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Etkinlik oluşturulamadı." }, { status: 500 });
  }
}

export async function PUT(_req: NextRequest) {
  try {
    const body = await _req.json();
    const parsed = eventUpdateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });

    const { id, title, description, location, date, isActive, image } = parsed.data;

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        location: location ?? undefined,
        description: description ?? undefined,
        date: date ? new Date(date) : undefined,
        isActive,
        image,
      },
    });

    await AuditLogger(_req, "UPDATE_EVENT", `Etkinlik güncellendi: ${event.title}`);

    return NextResponse.json(event);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Etkinlik güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest) {

  try {
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Etkinlik id gerekli." },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json(
        { error: "Etkinlik bulunamadı." },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.participant.deleteMany({
        where: { eventId: id },
      }),
      prisma.event.delete({
        where: { id },
      }),
    ]);

    await AuditLogger(
      _req,
      "DELETE_EVENT",
      `Etkinlik ve katılımcıları silindi: ${event.title}`
    );

    return NextResponse.json({
      message: "Etkinlik ve katılımcıları başarıyla silindi.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Etkinlik silinemedi." },
      { status: 500 }
    );
  }
}
