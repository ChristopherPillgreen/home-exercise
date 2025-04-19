import { motion } from "motion/react";
import { ModalProps } from "../types";

interface CreatePlanProps extends ModalProps {
  onSubmit: (planName: string) => void;
  planName: string;
  setPlanName: (name: string) => void;
}
export default function CreatePlan({
  isOpen,
  onClose,
  onSubmit,
  planName,
  setPlanName,
}: CreatePlanProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-deluge/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl text-deluge font-semibold mb-4">
          Create a New Plan
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(planName);
          }}>
          <input
            type="text"
            className="w-full border border-ocean-green p-2 rounded-xl shadow-md hover:shadow:lg mb-4 focus:outline-none focus:ring-british-racing-green"
            placeholder="Enter plan name..."
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
          <div className="flex justify-end space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}>
              <button
                type="submit"
                className="bg-ocean-green text-white shadow-md hover:shadow:lg px-4 py-2 rounded-xl">
                Create
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}>
              <button
                type="button"
                onClick={() => {onClose();
                }}
                className="bg-falu-red text-white shadow-md hover:shadow:lg px-4 py-2 rounded-xl">
                Cancel
              </button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
