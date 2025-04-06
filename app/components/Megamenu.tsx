"use client";

import { Button, MegaMenu, Navbar } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "motion/react";

export default function Nav() {
  const { data: session } = useSession();

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleLogout = () => {
    signOut();
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const linkVariants = {
    hover: { color: "#3C3C3C", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <MegaMenu>
      <motion.div
        className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar.Brand href="/home">
          <motion.img
            alt="Logo"
            src="logo.svg"
            className="h-4 w-auto md:h-6"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex">
          {session ? (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={handleLogout}
                style={{ backgroundColor: "#af7076" }}
              >
                Logout
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={handleGoogleSignIn}
                style={{ backgroundColor: "#74ac85" }}
              >
                Sign in with Google
              </Button>
            </motion.div>
          )}
        </div>
        <Navbar.Collapse>
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Navbar.Link href="/plans">Plans</Navbar.Link>
          </motion.div>
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Navbar.Link href="/about">About</Navbar.Link>
          </motion.div>
        </Navbar.Collapse>
      </motion.div>
    </MegaMenu>
  );
}
