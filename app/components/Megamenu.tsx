"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import MotionImage from "./MotionImage";
import PageLink from "./PageLink";

export default function Nav() {
  const { data: session } = useSession();

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex mt-1 md:mb-1 flex-col md:flex-row justify-center items-center">
      <MotionImage
        onClick={() => window.location.href = "/home"}
        width={288}
        height={36}
        src="logo_stsvdy"
        alt="Kineticare Logo"
        styling="md:mx-5"
      />
      <div className="m-5 flex space-x-4">
        <PageLink
          href="/plans"
          color="7874AC"
          name="Plans"
          title="Your Plans"
        />
        <PageLink
          href="/exercises"
          color="7874AC"
          name="Exercises"
          title="All Exercises"
        />
        {session ? (
          <PageLink
            onClick={handleLogout}
            color="7D1616"
            name="Logout"
            title="Logout"
          />
        ) : (
          <PageLink
            onClick={handleGoogleSignIn}
            color="58A870"
            name="Login"
            title="Login with Google"
          />
        )}
      </div>
    </div>
  );
}
