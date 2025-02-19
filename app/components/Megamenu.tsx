"use client";

import { useEffect, useState } from "react";
import { Button, MegaMenu, Navbar } from "flowbite-react";

export default function Nav() {
  const [isHiddenPage, setIsHiddenPage] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setIsHiddenPage(
        path === "/" ||
          path === "/confirm" ||
          path === "/sign-up" ||
          path === "/login"
      );
    }
  }, []);

  if (isHiddenPage) {
    return null;
  }

  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand href="/home">
          <img alt="" src="logo.png" className="h-16 w-auto" />
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex">
          
          <Button href="/login" style={{ backgroundColor: "#af7076" }}>
            Sign in with Google
          </Button>
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/plans">Plans</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/planner">Planner</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
