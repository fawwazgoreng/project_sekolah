import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: "anjaijosid0-aid-a0wd",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const user: any = {
          id: 1,
          username: "test",
          password: "test",
          role: "admin",
        };
        if (username === "test" && password === "test") {
          return user;
        } else {
          return null;
        }
        // try {
        //   const res = await fetch(`${process.env.NEXTBASEURL}`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       username: credentials?.username,
        //       password: credentials?.password,
        //     }),
        //   });
        //   if (!res.ok) return null;
        //   const data = await res.json();
        //   return {
        //     id: data.id,
        //     username: data.username,
        //   };
        // } catch (e) {
        //   console.error("Authorize error:", e);
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if ("username" in token) {
        session.user = {
          id: token.id,
          username: token.username,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
