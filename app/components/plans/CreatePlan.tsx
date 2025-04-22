import { ModalProps } from "../types";
import { AnimatedInput, HoverMotion } from "../";

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
          <AnimatedInput 
            voidChange={setPlanName}
            value={planName}
            additionalStyling="w-[15vh] sm:w-fit bg-ocean-green text-white"
            placeholder="Enter plan name..."
          />
          <div className="flex justify-end space-x-4">
            <HoverMotion>
              <button
                type="submit"
                className="bg-ocean-green text-white shadow-md hover:shadow:lg px-4 py-2 rounded-xl">
                Create
              </button>
            </HoverMotion>
            <HoverMotion>
              <button
                type="button"
                onClick={() => {onClose();
                }}
                className="bg-falu-red text-white shadow-md hover:shadow:lg px-4 py-2 rounded-xl">
                Cancel
              </button>
              </HoverMotion>
          </div>
        </form>
      </div>
    </div>
  );
}
