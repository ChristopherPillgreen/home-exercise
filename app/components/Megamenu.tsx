"use client";

import { Button, MegaMenu, Navbar } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";
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

  return (
    <MegaMenu>
      <motion.div
        className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar.Brand href="/home">
          <motion.div           
            className="h-4 w-auto md:h-6"

            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <CldImage
              width="240"
              height="30"
              src="logo_stsvdy"
              sizes="100vw"
              alt="Description of my image"
            />
          </motion.div>
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex">
        <motion.div
            className="mr-[1rem]"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
                href="/plans"
                style={{ backgroundColor: "#b9633a" }}
              >
                Your Plans
            </Button>
          </motion.div>
          <motion.div
                className="mr-[1rem]"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
          >
            <Button
                href="/exercises"
                style={{ backgroundColor: "#008d6c" }}
              >
                View Exercises
            </Button>
          </motion.div>
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
      </motion.div>
    </MegaMenu>
  );
}
