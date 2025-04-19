import { motion } from "motion/react";
import {InputProps} from "../types";

interface AnimatedSearchProps extends InputProps {
  additionalStyling?: string;
};

export default function AnimatedSearch({
  onChange,
  value,
  additionalStyling,
}: AnimatedSearchProps) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
      <input
        type="text"
        placeholder="Search..."
        className={`h-full px-2 rounded-xl shadow-md hover:shadow-lg focus:outline-none text-sm ${additionalStyling}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  );
}
