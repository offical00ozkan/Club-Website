import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hashPassword";
import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/schema/auth";
import { AuditLogger } from "@/lib/AuditLogger";

export async function POST(_req: NextRequest) {
  try {
    const body = await _req.json();

    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Bu e-posta zaten kullanılıyor." }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await AuditLogger(_req, "REGISTER_USER", `Kullanıcı hesap oluşturdu: ${email}`);

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Kullanıcı oluşturulamadı." }, { status: 500 });
  }
}
