"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";
import {
  IoArrowDownCircle,
  IoArrowUpCircle,
  IoCloseCircle,
} from "react-icons/io5";

interface PlanExercise {
  exercise: {
    exerciseID: number;
    exerciseName: string;
    exerciseDescription: string;
    image: string;
  };
  plan: {
    planID: number;
    frequency: number;
    favorites: boolean;
    planName: string;
  };
  id: number;
  sequenceNum: number;
  reps: number;
  sets: number;
  duration: string;
  time: string;
  description: string;
}

export default function EditPlanPage() {
  const [planExercises, setPlanExercises] = useState<PlanExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();
  const { planID } = useParams();
  const [notificationfalse, setNotificationFalse] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(0);
  const exercisesPerPage = 3;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/planexercise?planID=${planID}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const exercisesWithSequence = data.map(
          (exercise: PlanExercise, index: number) => ({
            ...exercise,
            sequenceNum: index + 1,
          })
        );
        setPlanExercises(exercisesWithSequence);
        console.log("Fetched exercises:", data);
      } catch (err: any) {
        console.error("Error fetching exercises:", err);
        setError(err.message || "Failed to fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    if (planID) {
      fetchExercises();
    } else {
      setError("Invalid Plan ID.");
      setLoading(false);
    }
  }, [planID]);

  const displayedExercises = planExercises.slice(
    currentPage * exercisesPerPage,
    (currentPage + 1) * exercisesPerPage
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    exerciseId: number,
    field: string
  ) => {
    console.log(
      `Changed ${field} for exercise ${exerciseId}: ${e.target.value}`
    );

    setPlanExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, [field]: e.target.value }
          : exercise
      )
    );
  };

  const handleDeleteExercise = async (exerciseID: number, id: number) => {
    try {
      const response = await fetch(
        `/api/planexercise?planID=${planID}&exerciseID=${exerciseID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Exercise deleted successfully");

        setPlanExercises((prev) => {
          const updatedExercises = prev
            .filter((exercise) => exercise.id !== id)
            .map((exercise, index) => ({
              ...exercise,
              sequenceNum: index + 1, // Recalculate sequenceNum
            }));

          // Adjust the current page if the current page is no longer valid
          const totalPages = Math.ceil(
            updatedExercises.length / exercisesPerPage
          );
          if (currentPage >= totalPages && currentPage > 0) {
            setCurrentPage(currentPage - 1);
          }

          return updatedExercises;
        });
      } else {
        console.error("Failed to delete exercise");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const savePlan = async () => {
    setSaving(true);
    try {
      console.log("Current planExercises before sending:", planExercises);

      const payload = {
        planID,
        exercises: planExercises.map((ex, idx) => ({
          exerciseID: ex.exercise.exerciseID,
          sequenceNum: ex.sequenceNum, // This is the updated sequence number
          reps: Number(ex.reps),
          sets: Number(ex.sets),
          duration: String(ex.duration),
          time: ex.time ? String(ex.time) : null,
          description: String(ex.description),
        })),
      };

      console.log(
        "Saving exercises payload:",
        JSON.stringify(payload, null, 2)
      );

      const response = await fetch("/api/planexercise", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save plan");
      setNotification("Plan saved successfully!");
    } catch (err: any) {
      console.error("Error saving plan:", err);
      setNotificationFalse("Failed to save plan.");
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleExportOption = (option: string) => {
    if (option === "PDF") {
      if (planExercises.length === 0) {
        setNotificationFalse("No exercises to export.");
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      generatePDF();
    } else if (option === "QR Code") {
      if (planExercises.length === 0) {
        setNotificationFalse("No exercises to export.");
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      setShowQRCode(true);
    }
  };

  const compactData = {
    p: planExercises[0]?.plan.planName || "",
    e: planExercises.map((ex: PlanExercise) => ({
      eid: ex.exercise.exerciseID,
      n: ex.exercise.exerciseName,
      sn: ex.sequenceNum,
      r: ex.reps,
      s: ex.sets,
      d: ex.duration,
      t: ex.time,
      de: ex.description,
      i: ex.exercise.image,
    })),
  };

  const handleMoveExercise = (exerciseId: number, direction: "up" | "down") => {
    setPlanExercises((prev) => {
      const index = prev.findIndex((exercise) => exercise.id === exerciseId);
      console.log(`Moving exercise with ID ${exerciseId}, current index: ${index}`);
  
      if (index === -1) {
        console.log(`Exercise with ID ${exerciseId} not found.`);
        return prev;
      }
  
      const newExercises = [...prev];
      console.log(`Exercise found at index ${index}. New list:`, newExercises);
  
      if (direction === "up" && index === 0) {
        console.log(`Exercise is already at the top, no movement.`);
        return prev;
      }
      if (direction === "down" && index === newExercises.length - 1) {
        console.log(`Exercise is already at the bottom, no movement.`);
        return prev;
      }
  
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      console.log(`Swapping exercise at index ${index} with exercise at index ${swapIndex}`);
  
      [newExercises[index], newExercises[swapIndex]] = [
        newExercises[swapIndex],
        newExercises[index],
      ];
  
      const updatedExercises = newExercises.map((exercise, idx) => {
        const updatedExercise = { ...exercise, sequenceNum: idx + 1 };
        console.log(`Updated exercise ID ${exercise.id} sequence number: ${updatedExercise.sequenceNum}`);
        return updatedExercise;
      });
  
      console.log("Updated exercises list:", updatedExercises);
      return updatedExercises;
    });
  };

  const jsonData = JSON.stringify(compactData);
  const base64Data = encodeURIComponent(btoa(jsonData));

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont("helvetica", "bold");
    doc.setTextColor("#7874AC");
    doc.setFontSize(30);
    doc.text(`${planExercises[0]?.plan.planName}`, pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let yOffset = 30;

    // Sort planExercises by sequenceNum before the loop
    planExercises.sort((a, b) => a.sequenceNum - b.sequenceNum);

    planExercises.forEach((exercise) => {
      // Reserve vertical space for image height if needed
      const cloudinaryImageUrl = `https://res.cloudinary.com/kineticare/image/upload/${exercise.exercise.image}`;
      const imageHeight = 80;
      const textBlockHeight = 80; // estimated
      // Reset page if needed before starting exercise
      if (yOffset + textBlockHeight > 270) {
        doc.addPage();
        yOffset = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setTextColor("#7874AC");
      doc.setFontSize(14);
      doc.text(`${exercise.exercise.exerciseName}`, 14, yOffset);
      yOffset += 8;

      doc.setFont("helvetica", "normal");
      doc.setTextColor("#000000");
      doc.setFontSize(12);
      doc.text(`Sequence Number: ${exercise.sequenceNum}`, 14, yOffset);
      yOffset += 6;

      doc.text(`Reps: ${exercise.reps}`, 14, yOffset);
      yOffset += 6;

      doc.text(`Sets: ${exercise.sets}`, 14, yOffset);
      yOffset += 6;

      doc.text(`Duration: ${exercise.duration} minutes`, 14, yOffset);
      yOffset += 6;

      doc.text(`Time: ${exercise.time}`, 14, yOffset);
      yOffset += 6;

      doc.text("Description:", 14, yOffset);
      yOffset += 6;

      const desc = exercise.exercise.exerciseDescription;
      const descriptionLines = doc.splitTextToSize(desc, 100); // narrower width for left side
      doc.text(descriptionLines, 14, yOffset);
      const descHeight = descriptionLines.length * 6;

      // Draw image on the right side
      const imageX = pageWidth - 14 - 50; // 14 margin from right, 50 is width
      doc.addImage(cloudinaryImageUrl, "JPEG", imageX-50, yOffset-50, 100, 50);

      yOffset += Math.max(descHeight, imageHeight) - 50;

      if (yOffset > 260) {
        doc.addPage();
        yOffset = 5;
      }
    });
    doc.save(`${planExercises[0]?.plan.planName}.pdf`);
  };

  if (loading)
    return <div className="text-center mt-4">Loading exercises...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <>
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
          {notification}
        </div>
      )}
      {notificationfalse && (
        <div
          className="fixed top-5 right-5 z-50 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300"
          style={{ backgroundColor: "#793339" }}
        >
          {notificationfalse}
        </div>
      )}

      <div className="container h-fit overflow-hidden">
        <div className="w-full px-4 pt-4 flex items-center justify-between flex-wrap gap-4">
          <h1 className="font-bold text-[#7874AC] text-3xl whitespace-nowrap">
            {planExercises[0]?.plan.planName}
          </h1>
          <div className="flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => router.push(`/plans`)}
                className="px-4 py-2 bg-[#793339] text-white rounded-xl flex items-center justify-center min-w-fit whitespace-nowrap"
              >
                Back to Plan
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => router.push(`/plans/${planID}/exercises`)}
                className="h-full px-4 bg-[#74ac85] text-white rounded-xl flex items-center justify-center overflow-hidden"
              >
                Add Exercises
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={savePlan}
                disabled={saving}
                className={`px-4 py-2 bg-[#7874AC] text-white rounded-xl flex items-center justify-center min-w-fit whitespace-nowrap ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {saving ? "Saving..." : "Save Plan"}
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 bg-[#cf935c] text-white rounded-xl flex items-center justify-center min-w-fit whitespace-nowrap"
                >
                  Export as
                  <svg
                    className="ml-2 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleExportOption("PDF")}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExportOption("QR Code")}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        QR Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {showQRCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40vh] max-w-md relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
              >
                <IoCloseCircle
                  onClick={() => setShowQRCode(false)}
                  color="#793339"
                  size={30}
                />
              </motion.div>
              <h2 className="text-lg font-semibold text-[#7874AC] mb-4 text-center">
                {planExercises[0]?.plan.planName}
              </h2>
              <div className="flex justify-center">
                <QRCode
                  value={base64Data}
                  size={150}
                  bgColor="#ffffff"
                  fgColor="#7874AC"
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full px-4 py-6 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Your actual exercise cards */}
            {displayedExercises
              .slice()
              .sort((a, b) => a.sequenceNum - b.sequenceNum)
              .map((exercise) => (
                <div
                  key={exercise.id}
                  className="border p-4 rounded-xl shadow bg-white min-h-[60vh] max-h-fit flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="flex-1 font-semibold text-[#7874AC] text-2xl px-3 rounded">
                      {exercise.exercise.exerciseName}
                    </h1>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoArrowUpCircle
                        color="#74ac85"
                        size={30}
                        onClick={() => handleMoveExercise(exercise.id, "up")}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoArrowDownCircle
                        color="#74ac85"
                        size={30}
                        onClick={() => handleMoveExercise(exercise.id, "down")}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoCloseCircle
                        onClick={() =>
                          handleDeleteExercise(
                            exercise.exercise.exerciseID,
                            exercise.id
                          )
                        }
                        color="#793339"
                        size={30}
                      />
                    </motion.div>
                  </div>

                  {exercise.exercise.image ? (
                    <CldImage
                      src={exercise.exercise.image}
                      width="300"
                      height="200"
                      alt={exercise.exercise.exerciseName}
                      className="w-full h-36 object-contain mt-2 rounded"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-700 overflow-y-auto">
                    <div className="flex flex-row justify-start gap-1 mt-2">
                      <div className="flex flex-row gap-0 mt-2">
                        <button
                          type="button"
                          className="px-2 py-1 rounded-xl rounded-r-none bg-[#b9633a] text-white font-semibold"
                          disabled
                        >
                          Repititions
                        </button>
                        <input
                          id={`reps-input-${exercise.id}`} // Unique ID for the input box
                          type="number"
                          value={exercise.reps ?? 0}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, "reps")
                          }
                          className="w-2/3 border rounded-xl rounded-l-none p-2"
                          min="0"
                        />
                      </div>
                      <div className="flex flex-row gap-0 mt-2">
                        <button
                          type="button"
                          className="px-2 py-1 rounded-xl rounded-r-none bg-[#b9633a] text-white font-semibold"
                          disabled
                        >
                          Duration
                        </button>
                        <input
                          id={`duration-input-${exercise.id}`}
                          type="text"
                          value={exercise.duration ?? ""}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, "duration")
                          }
                          className="w-2/3 border rounded-xl rounded-l-none p-2"
                          placeholder="0 sec"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row justify-start gap-1 mt-2">
                      <div className="flex flex-row gap-0 mt-2">
                        <button
                          type="button"
                          className="px-2 py-1 rounded-xl rounded-r-none bg-[#b9633a] text-white font-semibold"
                          disabled
                        >
                          Sets
                        </button>
                        <input
                          id={`sets-input-${exercise.id}`}
                          type="number"
                          value={exercise.sets ?? 0}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, "sets")
                          }
                          className="w-2/3 border rounded-xl rounded-l-none p-2"
                          min="0"
                        />
                      </div>
                      <div className="flex flex-row gap-0 mt-2">
                        <button
                          type="button"
                          className="px-2 py-1 rounded-xl rounded-r-none bg-[#b9633a] text-white font-semibold"
                          disabled
                        >
                          Time
                        </button>
                        <select
                          id={`time-select-${exercise.id}`}
                          value={exercise.time ?? "1 time / day"} // Default value
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, "time")
                          }
                          className=" border rounded-xl rounded-l-none p-2"
                        >
                          <option value="1 time / day">1 time / day</option>
                          <option value="2 times / day">2 times / day</option>
                          <option value="3 times / day">3 times / day</option>
                          <option value="4 times / day">4 times / day</option>
                          <option value="5 times / day">5 times / day</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-row justify-start gap-0 mt-4">
                      <button
                        type="button"
                        className="px-2 py-1 rounded-xl rounded-r-none bg-[#b9633a] text-white font-semibold"
                        disabled
                      >
                        Description:
                      </button>
                      <textarea
                        value={exercise.description}
                        onChange={(e) =>
                          handleInputChange(e, exercise.id, "description")
                        }
                        className="border rounded-xl rounded-l-none p-2 w-full resize-none"
                        maxLength={500}
                      />
                    </div>
                  </div>
                </div>
              ))}

            {/* Placeholder cards */}
            {Array.from({
              length: exercisesPerPage - displayedExercises.length,
            }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="border p-4 rounded-xl shadow bg-white min-h-[60vh] max-h-fit flex flex-col justify-center items-center text-gray-400"
              >
                <div className="flex flex-1 justify-center items-center w-full min-h-[200px] min-w-[450px]">
                  <span className="text-center">Empty Slot</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2">
          {[...Array(Math.ceil(planExercises.length / exercisesPerPage))].map(
            (_, index) => (
              <motion.div
                key={`dot-${index}`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === index ? "bg-[#7874AC]" : "bg-gray-300"
                  }`}
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </>
  );
}
