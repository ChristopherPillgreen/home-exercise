import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, Account, Profile } from "next-auth";

// Extend the session and user interfaces to include extra fields
declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
    };
  }
}

// Create a custom token interface
interface CustomToken extends JWT {
  sub: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
}

// NextAuth configuration
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Handling session data to include user fields
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = (token as CustomToken).sub || "";
        session.user.email = (token as CustomToken).email || "";
        session.user.name = (token as CustomToken).name || "";
        session.user.firstName = (token as CustomToken).firstName || "";
        session.user.lastName = (token as CustomToken).lastName || "";
      }
      return session;
    },

    // Creating and modifying JWT token to store user info
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account: Account | null;
      profile?: Profile;
    }) {
      if (account && profile) {
        const nameParts = profile.name ? profile.name.split(" ") : [];
        const firstName = nameParts.slice(0, nameParts.length - 1).join(" ");
        const lastName = nameParts[nameParts.length - 1] || "";

        (token as CustomToken).sub = profile.sub || ""; // Google ID
        (token as CustomToken).email = profile.email || "";
        (token as CustomToken).name = profile.name || "";
        (token as CustomToken).firstName = firstName;
        (token as CustomToken).lastName = lastName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Optional: Custom sign-in page URL
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
