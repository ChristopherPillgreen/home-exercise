import { NextAuthOptions, Profile, Session, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { User } from "@entities/User.entity";
import { getOrm } from "mikro-orm.config";

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

interface CustomToken extends JWT {
  sub: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
}

export const authOptions: NextAuthOptions = {
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
          
          const orm = await getOrm();
          const em = orm.em.fork(); 

          
          const userID = profile?.sub;

          if (!userID) {
            console.error("Google ID (profile.sub) is missing");
            return false; 
          }

          const existingUser = await em.findOne(User, { userEmail: email });

          if (!existingUser) {
            
            const newUser = em.create(User, {
              userID: userID, 
              userEmail: email || "",
              userFirstName: firstName,
              userLastName: lastName,
              userPassword: "defaultPassword", 
            });
            await em.persistAndFlush(newUser);
          }
        } catch (error) {
          console.error("Error checking/creating user:", error);
          return false; 
        }
      }
      return true; 
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

        (token as CustomToken).sub = profile.sub || ""; 
        (token as CustomToken).email = profile.email || "";
        (token as CustomToken).name = profile.name || "";
        (token as CustomToken).firstName = firstName;
        (token as CustomToken).lastName = lastName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", 
  },
};