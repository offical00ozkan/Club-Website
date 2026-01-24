import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

export const CredentialsSchema = z.object({ 
    email: z.string().email(),
    password: z.string().min(6) 
})