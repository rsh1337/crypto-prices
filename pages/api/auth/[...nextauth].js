import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


export default NextAuth({
  session: {
    jwt: true,
},
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
      email: { label: "Username", type: "email", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials, req) {
      const email = credentials.email;
      const password = credentials.password;
      const user = await Users.findOne({ email })
      if (!user) {
      throw new Error("You haven't registered yet")
      }
      if (user) return signinUser({ password, user })
      }
      }),
  ],
});
