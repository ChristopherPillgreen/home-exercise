import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, Account, Profile } from "next-auth";
import { User } from "@entities/User.entity";
import { getOrm } from "mikro-orm.config";

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

// Custom JWT interface
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
    async signIn({ user, account, profile }) {
  if (account?.provider === "google") {
    const { email, name } = user;
    const nameParts = name ? name.split(" ") : [];
    const firstName = nameParts.slice(0, -1).join(" ");
    const lastName = nameParts[nameParts.length - 1] || "";

    try {
      // Get MikroORM instance and fork the EntityManager for context-specific actions
      const orm = await getOrm();
      const em = orm.em.fork(); // Fork EntityManager to avoid global context issues

      // Use profile.sub as the unique Google ID for the user
      const userID = profile?.sub; // This should be the Google user ID

      if (!userID) {
        console.error("Google ID (profile.sub) is missing");
        return false; // Reject login if Google ID is not available
      }

      // Check if user exists in DB
      const existingUser = await em.findOne(User, { userEmail: email });

      if (!existingUser) {
        // Create a new user in the database
        const newUser = em.create(User, {
          userID: userID, // Use profile.sub here as userID
          userEmail: email || "",
          userFirstName: firstName,
          userLastName: lastName,
          userPassword: "defaultPassword", // Handle default password appropriately
        });
        await em.persistAndFlush(newUser);
      }
    } catch (error) {
      console.error("Error checking/creating user:", error);
      return false; // Reject login if there's a DB error
    }
  }
  return true; // Allow login
},


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
        const firstName = nameParts.slice(0, -1).join(" ");
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
    signIn: "/auth/signin", // Customize your sign-in page
  },
};

const handler = NextAuth(authOptions);
export { authOptions };
export { handler as GET, handler as POST };
