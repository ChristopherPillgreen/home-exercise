"use client";

import { useEffect, useState } from 'react';
import { Button, MegaMenu, Navbar } from 'flowbite-react';

export default function Nav() {
  const [isHiddenPage, setIsHiddenPage] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setIsHiddenPage(path === '/' || path === '/confirm');
    }
  }, []);

  if (isHiddenPage) {
    return null;
  }


  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand>
          <img alt="" src="logo.png" className="h-16 w-auto" />
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex">
          <a
            href="#"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
          >
            Login
          </a>
          <Button href="#">Sign up</Button>
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/home">Home</Navbar.Link>
          <Navbar.Link href="/exercises">Exercises</Navbar.Link>
          <Navbar.Link href="/favorites">Favorites</Navbar.Link>
          <Navbar.Link href="/settings">Settings</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
