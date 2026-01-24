import z from "zod";

export const participantCreateSchema = z.object({
  eventId: z.string().cuid(),
  name: z.string().min(1),
  email: z.string().min(1),
  surname: z.string().min(1),
  code: z.string().min(1),
});
