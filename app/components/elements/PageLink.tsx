import { motion } from "motion/react";
import { LinkProps } from "../types";

interface PageLinkProps extends LinkProps {
  color: string;
  name: string;
  title?: string;
  additionalStyling?: string;
}

export default function PageLink({
  onClick,
  href,
  color,
  name,
  title,
  additionalStyling,
}: PageLinkProps) {
  if (href === undefined) {
    return(
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
      <button
        onClick={onClick}
        className={`cursor-pointer block h-full px-3 py-2 ${color} text-white rounded-xl shadow-md hover:shadow-lg ${additionalStyling}`}
        rel="next"
        title={title}>
        {name}
      </button>
    </motion.div>
    );
  } else {
    return (
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
        <a
          onClick={onClick}
          href={href}
          className={`cursor-pointer block h-full px-3 py-2 ${color} text-white rounded-xl shadow-md hover:shadow-lg ${additionalStyling}`}
          rel="next"
          title={title}>
          {name}
        </a>
      </motion.div>
    );
  }
}
