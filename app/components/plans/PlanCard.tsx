"use client";

import { motion } from "motion/react";
import { IoCloseCircle, IoCog } from "react-icons/io5";
import { encodePlanId } from "app/api/urlsqids";
import { useRouter } from "next/navigation";

type PlanCardProps = {
  planID: number;
  planName: string;
  planDescription: string;
  onEdit: (planID: number) => void;
  onDelete: (planID: number) => void;
};

export default function PlanCard({
  planID,
  planName,
  planDescription,
  onEdit,
  onDelete,
}: PlanCardProps) {
  const router = useRouter();

  return (
    <div
      className="relative flex-1 mt-2 sm:mt-0 min-w-[50%] sm:min-w-[20%] sm:max-w-[30%] h-[30vh] border rounded-xl shadow-md hover:shadow:xl hover:box-border hover:border-deluge hover:border transition cursor-pointer"
      onClick={() => router.push(`/plans/${encodePlanId(planID)}`)}>
      <div className="bg-[white] p-2 rounded-t-xl h-[30%] flex items-center">
        <h2 className="text-xl font-semibold">
          {planName.length > 26 ? `${planName.slice(0, 24)}...` : planName}
        </h2>
      </div>

      <div className="bg-gray-100 p-2 rounded-b-xl h-[70%] flex">
        <p className="relative justify-start text-gray-600">
          {planDescription
            ? planDescription.length > 140
              ? `${planDescription.slice(0, 140)}...`
              : planDescription
            : ""}
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-2 right-10">
        <IoCog
          onClick={(e) => {
            e.stopPropagation();
            onEdit(planID);
          }}
          color="#004F2D"
          size={30}
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-2 right-2">
        <IoCloseCircle
          onClick={(e) => {
            e.stopPropagation();
            onDelete(planID);
          }}
          color="#3D0814"
          size={30}
        />
      </motion.div>
    </div>
  );
}
