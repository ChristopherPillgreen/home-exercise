"use client";

import Nav from "./Megamenu";
import { usePathname } from "next/navigation";

export default function NavWrapper() {
  const pathname = usePathname();
  const hiddenNavRoutes = ["/", "/confirm", "/sign-up", "/login"];
  const shouldHideNav = hiddenNavRoutes.includes(pathname);

  return !shouldHideNav ? (
    <nav className="w-full p-1">
      <Nav />
    </nav>
  ) : null;
}