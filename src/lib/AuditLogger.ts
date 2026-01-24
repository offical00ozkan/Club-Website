import prisma from "@/lib/prisma";
import { auth } from "./auth";
import { getClientIp } from "./getClientIp";
import { NextRequest } from "next/server";

export async function AuditLogger(_req: NextRequest, action: string, description: string) {
  try {
    if (!_req || !action || !description) {
      throw new Error("Audit log için request, action ve description zorunludur.");
    }

    const session = await auth();

    await prisma.audit.create({
      data: {
        action,
        description,
        userId: session?.user?.id ?? null,
        userEmail: session?.user?.email ?? null,
        ipAddress: getClientIp(_req),
      },
    });
  } catch (error) {
    console.error("[AUDIT_LOG_ERROR]", error);
  }
}
