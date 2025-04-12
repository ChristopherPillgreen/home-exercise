"use client";

import AnimatedLink from "../components/AnimatedLink";
import { CldImage } from "next-cloudinary";
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
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-5xl justify-between items-center px-4 md:px-8" // Responsive layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Animated Links */}
        <div className="flex flex-col gap-6 mb-8 md:mb-0"> {/* Add margin for smaller screens */}
          <motion.div className="w-64 md:w-80 h-20 md:h-24" variants={linkVariants}>
            <AnimatedLink href="/start" text="Getting Started" strokeColor="#7076af" />
          </motion.div>
          <motion.div className="w-64 md:w-80 h-20 md:h-24" variants={linkVariants}>
            <AnimatedLink href="/questions" text="Questions" strokeColor="#793339" />
          </motion.div>
          <motion.div className="w-64 md:w-80 h-20 md:h-24" variants={linkVariants}>
            <AnimatedLink href="/about" text="About Us" strokeColor="#cf935c" />
          </motion.div>
          <motion.div className="w-64 md:w-80 h-20 md:h-24" variants={linkVariants}>
            <AnimatedLink href="/contact" text="Contact Us" strokeColor="#74ac85" />
          </motion.div>
        </div>

        {/* Right Column: Logo */}
        <motion.div
          className="relative flex items-center justify-center h-auto w-auto" // Center the logo
          variants={rightColumnVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Image */}
          <CldImage
            src="webstock_fzsz6p"
            width="384"
            height="340"
            sizes="(max-width: 768px) 60vw, 40vw" // Responsive sizes
            alt="Image of site running on computer"
            className="w-auto h-auto transform scale-90 md:scale-75" // Adjust scaling for smaller screens
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
