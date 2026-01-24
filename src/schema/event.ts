import z from "zod";

export const eventCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  date: z.string().min(1),
  isActive: z.boolean().optional(),
  image: z.string().optional(),
});

export const eventUpdateSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  isActive: z.boolean().optional(),
  image: z.string().optional(),
});
