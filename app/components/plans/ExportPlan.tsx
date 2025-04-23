import { ModalProps } from "../types";
import PageLink from "../elements/PageLink";
import HoverMotion from "../motion/HoverMotion";
import { IoCloseCircle } from "react-icons/io5";
import { on } from "events";

interface DeletePlanProps extends ModalProps {
  handleExportOption: (option: string) => void;
}

export default function ExportPlan({
  isOpen,
  handleExportOption,
  onClose,
}: DeletePlanProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-falu-red/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl text-deluge font-semibold mb-4">
          Choose a format to export your plan
        </h3>
        <div className="flex justify-center space-x-4">
          <PageLink
            onClick={() => handleExportOption("PDF")}
            color="bg-deluge"
            name="PDF"
          />
          <PageLink
            onClick={() => handleExportOption("QR Code")}
            color="bg-deluge"
            name="QR Code"
          />
          <PageLink
            onClick={onClose}
            color="bg-falu-red"
            name="Cancel"
          />
        </div>
      </div>
    </div>
  );
}
