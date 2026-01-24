import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuditLogger } from "@/lib/AuditLogger";
import { memberCreateSchema, memberUpdateSchema } from "@/schema/member";

export async function POST(_req: NextRequest) {
  try {
    const body = await _req.json();
    const parsed = memberCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz veri.", details: parsed.error.format() }, { status: 400 });
    }

    const { name, email, linkedIn, role } = parsed.data;

    const member = await prisma.member.create({ data: { name, email, linkedIn, role } });

    await AuditLogger(_req, "CREATE_MEMBER", `Üye oluşturuldu: ${member.name}`);

    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Üye oluşturulamadı." }, { status: 500 });
  }
}

export async function PUT(_req: NextRequest) {
  try {
    const body = await _req.json();
    const parsed = memberUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz veri.", details: parsed.error.format() }, { status: 400 });
    }

    const { id, name, email, linkedIn, role } = parsed.data;

    const member = await prisma.member.update({ where: { id }, data: { name, email, linkedIn, role } });

    await AuditLogger(_req, "UPDATE_MEMBER", `Üye güncellendi: ${member.name}`);

    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Üye güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest) {
  try {
    const id = new URL(_req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Üye id gerekli." }, { status: 400 });

    const deleted = await prisma.member.delete({ where: { id } });

    await AuditLogger(_req, "DELETE_MEMBER", `Üye silindi: ${deleted.name}`);

    return NextResponse.json({ message: "Üye silindi.", deleted });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Üye silinemedi." }, { status: 500 });
  }
}
