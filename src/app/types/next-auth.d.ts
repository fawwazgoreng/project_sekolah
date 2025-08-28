import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      accessToken?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name: string
    username: string
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    accessToken?: string
  }
}
