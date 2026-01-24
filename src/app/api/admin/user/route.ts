import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AuditLogger } from "@/lib/AuditLogger";

export async function GET(_req: NextRequest) {
  try {

    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    let result;
    if (id) {
      result = await prisma.user.findUnique({
        where: { id },
        include: { audits: true },
      });
      if (!result) return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    } else {
      result = await prisma.user.findMany({
        include: { audits: true },
      });
    }

    await AuditLogger(_req, "ALL_READ_USER", `Tüm kullanıcılar listelendi`);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kullanıcılar listelenemedi." }, { status: 500 });
  }
}

export async function PUT(_req: NextRequest) {
  try {

    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Kullanıcı ID gerekli." },
        { status: 400 }
      );
    }

    const body = await _req.json();
    const { name, email, role, isActive } = body;

    if (!name && !email && !role && isActive === undefined) {
      return NextResponse.json(
        { error: "Güncellenecek alan yok." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    await AuditLogger(_req, "ADMIN_UPDATE_USER", `Admin kullanıcı güncelledi: ${id}`);

    return NextResponse.json({
      message: "Kullanıcı güncellendi.",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Kullanıcı güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest) {
  try {
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Kullanıcı ID gerekli." },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    await AuditLogger(_req, "ADMIN_DELETE_USER", `Admin kullanıcı sildi: ${id}`);

    return NextResponse.json({
      message: "Kullanıcı silindi.",
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Kullanıcı silinemedi." },
      { status: 500 }
    );
  }
}
