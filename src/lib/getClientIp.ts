import { NextRequest } from "next/server";

export function getClientIp(_req: NextRequest) {
  const forwarded = _req.headers.get("x-forwarded-for");

  if (forwarded) return forwarded.split(",")[0].trim();
  
  const realIp = _req.headers.get("x-real-ip");
  
  if (realIp) return realIp;
  
  return "unknown";
}
