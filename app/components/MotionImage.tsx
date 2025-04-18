import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";

export default function MotionImage({
  onClick,
  width,
  height,
  src,
  alt,
}: {
  onClick?: () => void;
  width: number;
  height: number;
  src: string;
  alt: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="md:mx-5">
      <CldImage width={width} height={height} src={src} alt={alt} onClick={onClick}/>
    </motion.div>
  );
}
