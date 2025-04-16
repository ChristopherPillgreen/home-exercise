"use client";

import Link from "next/link";
import { motion } from "motion/react";

function generateGradientColors(baseColor: string): string[] {
  const lighten = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  const darken = (color: string, percent: number) => lighten(color, -percent);

  return [lighten(baseColor, 5), baseColor, darken(baseColor, 5)];
}

interface AnimatedLinkProps {
  href: string;
  text: string;
  strokeColor: string;
}

export default function AnimatedLink({ href, text, strokeColor }: AnimatedLinkProps) {
  const [lightShade, baseShade, darkShade] = generateGradientColors(strokeColor);

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="relative w-full h-20 flex items-center justify-center overflow-hidden rounded-xl shadow-md: hover:shadow-lg"
      style={{
        background: `linear-gradient(90deg, ${lightShade}, ${baseShade}, ${darkShade})`,
        backgroundSize: "200% 200%",
        animation: "gradientAnimation 3s ease infinite",
      }}
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      transition={{ type: "spring", stiffness: 50, damping: 10 }}
    >
      <Link href={href} className="relative w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 260 80"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M10 10 H250 A10 10 0 0 1 260 20 V70 A10 10 0 0 1 250 80 H10 A10 0 0 1 0 70 V20 A10 10 0 0 1 10 10 Z"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white transition-opacity duration-300 hover:opacity-80">
          {text}
        </div>
      </Link>
    </motion.div>
  );
}