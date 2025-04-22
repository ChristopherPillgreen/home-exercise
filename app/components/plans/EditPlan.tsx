import { ModalProps } from "../types";
import PageLink from "../elements/PageLink";
import StaticInput from "../elements/StaticInput";

interface EditPlanProps extends ModalProps {
  onSave: () => void;
  planName: string;
  setPlanName: (name: string) => void;
  planDescription: string;
  setPlanDescription: (description: string) => void;
}

export default function EditPlan({
  isOpen,
  onClose,
  onSave,
  planName,
  setPlanName,
  planDescription,
  setPlanDescription,
}: EditPlanProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-deluge/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl text-deluge font-semibold mb-4">Edit Plan</h3>
        <div className="mb-4">
          <label className="block text-deluge mb-1 font-medium">
            Plan Name
          </label>
          <StaticInput
            stringChange={setPlanName}
            value={planName}
            placeholder="Enter plan name..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-deluge mb-1 font-medium">
            Description
          </label>
          <textarea
            className="w-full border border-ocean-green p-2 rounded-xl shadow-md hover:shadow:lg focus:outline-none focus:ring focus:ring-british-racing-green resize-none"
            rows={4}
            value={planDescription}
            onChange={(e) => setPlanDescription(e.target.value)}
            maxLength={150}
            placeholder="Enter plan description..."
          />
        </div>
        <div className="flex justify-center space-x-4">
          <PageLink
            onClick={onSave}
            color="bg-ocean-green"
            name="Save Plan"
            title="Save Plan"
          />
          <PageLink
            onClick={onClose}
            color="bg-falu-red"
            name="Cancel"
            title="Cancel"
          />
        </div>
      </div>
    </div>
  );
}
