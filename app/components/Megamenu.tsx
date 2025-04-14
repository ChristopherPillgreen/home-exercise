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
            <button
                onClick={() => window.location.href = "/plans"}
                className="h-full px-4 pt-2 pb-2 bg-[#b9633a] text-white rounded-xl flex items-center justify-center overflow-hidden">
                Your Plans
            </button>
          </motion.div>
          <motion.div
                className="mr-[1rem]"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
          >
            <button
                onClick={() => window.location.href = "/exercises"}
                className="h-full px-4 pt-2 pb-2 bg-[#008d6c] text-white rounded-xl flex items-center justify-center overflow-hidden">
                Exercises
            </button>
          </motion.div>
          {session ? (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <button
                onClick={handleLogout}
                className="h-full px-4 pt-2 pb-2 bg-[#af7076] text-white rounded-xl flex items-center justify-center overflow-hidden">
                Logout
            </button>
            </motion.div>
          ) : (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <button
                onClick={handleGoogleSignIn}
                className="h-full px-4 pt-2 pb-2 bg-[#74ac85] text-white font-semibold rounded-xl flex items-center justify-center overflow-hidden">
                Sign in with Google
            </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </MegaMenu>
  );
}
