import NextAuth from "next-auth"
import type { User } from "next-auth"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { verifyPassword } from "@/lib/hashPassword"
import { CredentialsSchema } from "../schema/auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const parsed = CredentialsSchema.safeParse(credentials)
          if (!parsed.success) return null

          const { email, password } = parsed.data

          const existingUser = await prisma.user.findUnique({
            where: { email },
          })
          if (!existingUser || !existingUser.password) return null

          const passwordsMatch = await verifyPassword(
            existingUser.password,
            password
          )
          if (!passwordsMatch) return null

          await prisma.audit.create({
            data: {
              action: "LOGIN_USER",
              description: `Kullanıcı giriş yaptı: ${existingUser.email}`,
            },
          })

          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
          } as User
        } catch (error) {
          console.error("AUTH AUTHORIZE ERROR:", error)
          return null
        }
      }
    }),
  ],
  pages: { signIn: '/home/auth/login', error: '/home/auth/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})
