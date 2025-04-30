import { motion } from "motion/react";

interface PaginationDotsProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="flex items-center justify-center mt-1 space-x-2">
      {[...Array(totalPages)].map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}>
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentPage(index)}
            className={`cursor-pointer w-3 h-3 rounded-full shadow-md hover:shadow-lg ${
              currentPage === index ? "bg-deluge" : "bg-gray-300"
            }`}
          >
            {}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default PaginationDots;
