"use client";

import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { MotionImage, PageLink } from "../";

export default function Header() {
  const pathname = usePathname();
  const hiddenNavRoutes = ["/", "/confirm", "/sign-up", "/login"];

  const shouldHideNav =
  hiddenNavRoutes.includes(pathname) || pathname.match(/^\/plans\/[^/]+\/qr$/);

  const { data: session } = useSession();

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleLogout = () => {
    signOut();
  };

  return !shouldHideNav ? (
    <div className="flex md:mb-1 flex-col sm:flex-row justify-center items-center">
      <MotionImage
        onClick={() => window.location.href = "/home"}
        width={288}
        height={36}
        src="logo_stsvdy"
        alt="Kineticare Logo"
        styling="mt-5 sm:mt-0"
      />
      <div className="m-5 flex space-x-4">
        <PageLink
          href="/plans"
          color="bg-deluge"
          name="Your Plans"
          title="Your Plans"
        />
        <PageLink
          href="/exercises"
          color="bg-deluge"
          name="Exercises"
          title="All Exercises"
        />
        {session ? (
          <PageLink
            onClick={handleLogout}
            color="bg-falu-red"
            name="Logout"
            title="Logout"
          />
        ) : (
          <PageLink
            onClick={handleGoogleSignIn}
            color="bg-ocean-green"
            name="Login"
            title="Login with Google"
          />
        )}
      </div>
    </div>
  ) : null;
}