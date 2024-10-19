import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { verifyPassword } from "./lib/utils"
import { db } from "./db";

class UserNotFoundError extends CredentialsSignin {
  code = "Email not found"
}

class UserNotVerifiedError extends CredentialsSignin {
  code = "Email not verified"
}

class PasswordInvalidError extends CredentialsSignin {
  code = "Invalid Password"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await db.query.users.findFirst({
          where: (model, { eq }) => eq(model.email, credentials!.email as string),
        });

        if (!user) {
            throw new UserNotFoundError();
        }

        if(!user.isEmailVerified) {
          throw new UserNotVerifiedError();
        }

        const isPasswordValid = await verifyPassword(credentials!.password as string, user.password);

        if (!isPasswordValid) {
          throw new PasswordInvalidError();
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  }
})