import z from "zod";

export const memberCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  linkedIn: z.string().url().optional(),
  role: z.string().optional(),
});

export const memberUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  linkedIn: z.string().url().optional(),
  role: z.string().optional(),
});
