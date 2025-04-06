"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  text: string;
  strokeColor: string;
}

export default function AnimatedLink({ href, text, strokeColor }: AnimatedLinkProps) {
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } },
  };

  return (
    <Link href={href} className="relative w-80 h-28"> {/* Increased height */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 120" // Adjusted viewBox to provide more space
        className="absolute inset-0 w-full h-full"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M20 20 H300 A20 20 0 0 1 320 40 V100 A20 20 0 0 1 300 120 H20 A20 20 0 0 1 0 100 V40 A20 20 0 0 1 20 20 Z" // Adjusted path for larger rounded rectangle
          fill={strokeColor} // Fill the rectangle with the stroke color
          stroke={strokeColor} // Border color
          strokeWidth="4"
          variants={pathVariants}
        />
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-white transition duration-300 hover:opacity-80">
        {text}
      </div>
    </Link>
  );
}