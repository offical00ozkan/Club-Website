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

      if (!result) {
        return NextResponse.json(
          { error: "Kullanıcı bulunamadı." },
          { status: 404 }
        );
      }
    } else {
      result = await prisma.user.findMany({
        include: { audits: true },
      });
    }

    await AuditLogger(_req, "ALL_READ_USER", "Kullanıcı(lar) listelendi");

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Kullanıcılar listelenemedi." },
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
        { error: "id parametresi zorunlu." },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    await AuditLogger(
      _req,
      "DELETE_USER",
      `Kullanıcı silindi: ${id}`
    );

    return NextResponse.json({
      message: "Kullanıcı başarıyla silindi.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Hesap silinemedi." },
      { status: 500 }
    );
  }
}

export async function PUT(_req: NextRequest) {
  try {
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id parametresi zorunlu." },
        { status: 400 }
      );
    }

    const body = await _req.json();
    const { name, email } = body;

    if (!name && !email) {
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
      },
    });

    await AuditLogger(
      _req,
      "UPDATE_USER",
      `Kullanıcı güncellendi: ${id}`
    );

    return NextResponse.json({
      message: "Profil başarıyla güncellendi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Profil güncellenemedi." },
      { status: 500 }
    );
  }
}
