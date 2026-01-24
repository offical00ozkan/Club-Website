import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      role?: string
    } & DefaultSession['User']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
}
