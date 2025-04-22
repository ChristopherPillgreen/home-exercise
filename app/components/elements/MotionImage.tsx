import { CldImage } from "next-cloudinary";
import { aProps } from "../types";
import { HoverMotion } from "../";

interface MotionImageProps extends aProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  styling?: string;
}

export default function MotionImage({
  onClick,
  width,
  height,
  src,
  alt,
  styling,
}: MotionImageProps) {
  return (
    <HoverMotion additionalStyling={styling}>
      <CldImage
        width={width}
        height={height}
        src={src}
        alt={alt}
        onClick={onClick}
      />
    </HoverMotion>
  );
}
