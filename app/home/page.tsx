"use client";

import AnimatedLink from "../components/AnimatedLink";
import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-5xl justify-between items-center px-4 md:px-8" // Responsive layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-6 mb-8 md:mb-0">
          <motion.div className="w-[30vh] md:w-[50vh] h-[10vh] md:h-[15vh]" variants={linkVariants}>
            <AnimatedLink href="/start" text="Getting Started" strokeColor="#7874AC" />
          </motion.div>
          <motion.div className="w-[30vh] md:w-[50vh] h-[10vh] md:h-[15vh]" variants={linkVariants}>
            <AnimatedLink href="/about" text="About Us" strokeColor="#7874AC" />
          </motion.div>
          <motion.div className="w-[30vh] md:w-[50vh] h-[10vh] md:h-[15vh]" variants={linkVariants}>
            <AnimatedLink href="/contact" text="Contact Us" strokeColor="#7D1616" />
          </motion.div>
        </div>

        <motion.div
          className="relative flex items-center justify-center h-auto w-auto"
          variants={rightColumnVariants}
          initial="hidden"
          animate="visible"
        >
          <CldImage
            src="webstock_fzsz6p"
            width="384"
            height="340"
            sizes="(max-width: 768px) 60vw, 40vw"
            alt="Image of site running on computer"
            className="mb-10 w-auto h-auto transform scale-90 md:scale-75"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
