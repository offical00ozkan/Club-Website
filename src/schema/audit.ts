import z from "zod";

export const auditCreateSchema = z.object({
  action: z.string().min(1),
  description: z.string().optional(),
  ipAddress: z.string().optional(),
});
