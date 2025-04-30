"use client";

import { ModalProps } from "../types";
import { HoverMotion, PageLink } from "../";
import StaticInput from "../elements/StaticInput";

interface CreatePlanProps extends ModalProps {
  onSubmit: () => void;
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl text-deluge font-semibold mb-4">Create A Plan</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}>
          <div className="mb-4">
            <label className="block text-deluge mb-1 font-medium">Plan Name</label>
            <StaticInput
              stringChange={setPlanName}
              value={planName}
              placeholder="Enter plan name..."
            />
          </div>
          <div className="flex justify-center space-x-4">
            <HoverMotion>
              <button
                type="submit"
                className="bg-ocean-green text-white shadow-md hover:shadow-lg px-4 py-2 rounded-xl">
                Create
              </button>
            </HoverMotion>
            <PageLink
              onClick={onClose}
              color="bg-falu-red"
              name="Cancel"
              title="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
