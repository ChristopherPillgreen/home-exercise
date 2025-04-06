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

  const rightColumnVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start smaller and invisible
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1, // Delay the animation until the left column finishes
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col justify-start pt-[5vw] items-center min-h-screen bg-gray-100">
      <motion.div
        className="flex w-full justify-between items-start pl-[15vw] pr-[15vw]" // Align links and logo horizontally
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Animated Links */}
        <div className="flex flex-col gap-6">
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
        </div>

        {/* Right Column: Logo */}
        <motion.div
          className="relative flex items-center justify-center h-24 w-full" // Make the container relative for positioning
          variants={rightColumnVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Image */}
          <motion.img
            src="/webstock.png" // Replace with the actual path to the Kineticare logo
            className="w-auto transform scale-50 mt-[21rem]" // Adjust size as needed
            onContextMenu={(e) => e.preventDefault()} // Disable right-click
            whileHover={{ scale: 0.51}}
          />

          {/* Overlapping Image */}
          <motion.img
            src="/appstore.svg" // Replace with the actual path to the App Store logo
            className="absolute w-auto transform h-[3rem] mt-[38rem] mr-[10rem]" // Adjust size as needed
            whileHover={{ scale: 1.1 }} // Add hover animation
            transition={{ duration: 0.2 }}
            onContextMenu={(e) => e.preventDefault()} // Disable right-click
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
