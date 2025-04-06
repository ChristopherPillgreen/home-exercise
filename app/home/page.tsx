"use client";

import AnimatedLink from "../components/AnimatedLink";
import { motion } from "motion/react";

export default function Home() {
  // Animation variants for the container and individual links
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of each child
      },
    },
  };

  const linkVariants = {
    hidden: { x: "100vw", opacity: 0 }, // Start off-screen to the right
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    },
  };

  return (
    <div className="flex flex-col justify-start pt-[5vw] items-center min-h-screen bg-gray-100">
      <motion.div
        className="flex flex-col gap-6 items-start w-full pl-[15vw]" // Align links to the right
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="w-80 h-24" variants={linkVariants}>
          <AnimatedLink href="/start" text="Getting Started" strokeColor="#7076af" />
        </motion.div>
        <motion.div className="w-80 h-24" variants={linkVariants}>
          <AnimatedLink href="/questions" text="Questions" strokeColor="#793339" />
        </motion.div>
        <motion.div className="w-80 h-24" variants={linkVariants}>
          <AnimatedLink href="/about" text="About Us" strokeColor="#cf935c" />
        </motion.div>
        <motion.div className="w-80 h-24" variants={linkVariants}>
          <AnimatedLink href="/contact" text="Contact Us" strokeColor="#74ac85" />
        </motion.div>
      </motion.div>
    </div>
  );
}
