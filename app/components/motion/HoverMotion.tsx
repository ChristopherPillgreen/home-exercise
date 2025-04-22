import { motion } from "motion/react";

interface HoverMotionProps extends React.PropsWithChildren {
  additionalStyling?: string;
}

export default function HoverMotion({
  children,
  additionalStyling,
}: HoverMotionProps) {
    return (
        <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className={additionalStyling}
        >
        {children}
        </motion.div>
    );
}
