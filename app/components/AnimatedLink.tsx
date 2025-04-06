"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface AnimatedLinkProps {
  href: string;
  text: string;
  strokeColor: string;
}

export default function AnimatedLink({ href, text, strokeColor }: AnimatedLinkProps) {
  return (
    <motion.div
      className="relative w-full h-20 flex items-center justify-center overflow-hidden rounded-md" // Smaller height and rounded corners
      initial={{ x: "100vw", opacity: 0 }} // Slide in from the right
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, damping: 10 }}
    >
      <Link href={href} className="relative w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 260 80" // Adjusted viewBox for smaller width
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M10 10 H250 A10 10 0 0 1 260 20 V70 A10 10 0 0 1 250 80 H10 A10 10 0 0 1 0 70 V20 A10 10 0 0 1 10 10 Z" // Shorter rectangle
            fill={strokeColor} // Fill the rectangle with the stroke color
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white transition-opacity duration-300 hover:opacity-80">
          {text}
        </div>
      </Link>
    </motion.div>
  );
}