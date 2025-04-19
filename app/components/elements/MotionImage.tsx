import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";
import {aProps} from "../types";

interface MotionImageProps extends aProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  styling?: string;
};

export default function MotionImage({
  onClick,
  width,
  height,
  src,
  alt,
  styling,
}: MotionImageProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className={styling}>
      <CldImage
        width={width}
        height={height}
        src={src}
        alt={alt}
        onClick={onClick}
      />
    </motion.div>
  );
}
