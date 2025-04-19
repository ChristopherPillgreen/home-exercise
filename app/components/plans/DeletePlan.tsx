import { motion } from "motion/react";
import { ModalProps } from "../types";

interface DeletePlanProps extends ModalProps {
  onConfirm: () => void;
}

export default function DeletePlan({
  isOpen,
  onConfirm,
  onClose,
}: DeletePlanProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-falu-red/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl text-deluge font-semibold mb-4">
          Are you sure you want to delete this plan?
        </h3>
        <div className="flex justify-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}>
            <button
              onClick={onConfirm}
              className="bg-falu-red text-white py-2 px-4 rounded-xl shadow-md hover:shadow:lg">
              Yes, Delete
            </button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}>
            <button
              onClick={onClose}
              className="bg-ocean-green text-white py-2 px-4 rounded-xl shadow-md hover:shadow:lg">
              No, Cancel
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
