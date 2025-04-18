import { motion } from "motion/react";

export default function PageLink({
  onClick,
  href,
  color,
  name,
  title,
  target,
} : {
  onClick?: () => void;
  href?: string;
  color: string;
  name: string;
  title?: string;
  target?: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
      <a
        onClick={onClick}
        href={href}
        className={`h-full px-3 py-2 bg-[#${color}] text-white rounded-xl shadow-md hover:shadow-lg`}
        rel="next"
        title={title}
        target={target}
      >
        {name}
      </a>
    </motion.div>
  );
}
