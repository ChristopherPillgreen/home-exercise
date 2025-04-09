"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { CldImage } from "next-cloudinary";

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
  duration: number;
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

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/planexercise?planID=${planID}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPlanExercises(data);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exerciseId: number,
    field: string
  ) => {
    setPlanExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, [field]: e.target.value } : exercise
      )
    );
  };

  const handleDeleteExercise = async (exerciseID: number, id: number) => {
    try {
      const response = await fetch(`/api/planexercise?planID=${planID}&exerciseID=${exerciseID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Exercise deleted successfully");
        setPlanExercises((prev) => prev.filter((exercise) => exercise.id !== id));
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
      const response = await fetch("/api/planexercise", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planID,
          exercises: planExercises.map((ex) => ({
            exerciseID: ex.exercise.exerciseID,
            sequenceNum: ex.sequenceNum,
            reps: ex.reps,
            sets: ex.sets,
            duration: ex.duration,
            time: ex.time,
            description: ex.description,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to save plan");
      setNotification("Plan saved successfully!");
    } catch (err: any) {
      console.error("Error saving plan:", err);
      setNotification("Failed to save plan.");
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
    }
  };

  const handleExportOption = (option: string) => {
    if (option === "PDF") {
      generatePDF();
    } else if (option === "QR Code") {
      setShowQRCode(true);
    }
  };

  const generatePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`${planExercises[0]?.plan.planName}`, pageWidth / 2, 20, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  let yOffset = 30;

  planExercises.forEach((exercise, index) => {
    // Reserve vertical space for image height if needed
    const cloudinaryImageUrl = `https://res.cloudinary.com/kineticare/image/upload/${exercise.exercise.image}`;
    const imageHeight = 50;
    const textBlockHeight = 80; // estimated

    // Reset page if needed before starting exercise
    if (yOffset + textBlockHeight > 270) {
      doc.addPage();
      yOffset = 20;
    }

    doc.setFontSize(14);
    doc.text(`Exercise ${index + 1}: ${exercise.exercise.exerciseName}`, 14, yOffset);
    yOffset += 8;

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
    doc.addImage(cloudinaryImageUrl, "JPEG", imageX, yOffset - 50, 50, 50);

    yOffset += Math.max(descHeight, imageHeight) + 12;

    if (yOffset > 260) {
      doc.addPage();
      yOffset = 20;
    }
  });

  doc.save(`${planExercises[0]?.plan.planName}.pdf`);
};

  if (loading) return <div className="text-center mt-4">Loading exercises...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{planExercises[0]?.plan.planName}</h1>

      <button
        onClick={() => router.push(`/plans/${planID}/exercises`)}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Exercises
      </button>

      <button
        onClick={savePlan}
        disabled={saving}
        className={`ml-4 bg-blue-500 text-white py-2 px-4 rounded mb-4 ${
          saving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {saving ? "Saving..." : "Save Plan"}
      </button>

      <div className="relative inline-block text-left ml-4">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-gray-500 text-white py-2 px-4 rounded flex items-center"
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

  {showQRCode && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button
        onClick={() => setShowQRCode(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-4 text-center">{planExercises[0]?.plan.planName}</h2>
      <div className="flex justify-center">
        <QRCode
          value={JSON.stringify({
            planName: planExercises[0]?.plan.planName || "Unnamed Plan",
            exercises: planExercises.map((exercise) => ({
              exerciseImage: exercise.exercise.image,
              exerciseID: exercise.exercise.exerciseID,
              exerciseName: exercise.exercise.exerciseName,
              sequenceNum: exercise.sequenceNum,
              reps: exercise.reps,
              sets: exercise.sets,
              duration: exercise.duration,
              time: exercise.time,
              description: exercise.description,
            })),
          })}
        />
      </div>
    </div>
  </div>
)}

        {notification && (
          <div className="bg-green-500 text-white p-2 rounded mt-4">
            {notification}
          </div>
        )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {planExercises.length === 0 ? (
          <p>No exercises added yet.</p>
        ) : (
          planExercises.map((exercise) => (
            <div key={exercise.id} className="border p-4 rounded shadow relative bg-white">
              <h2 className="text-xl font-semibold mt-2">
                {exercise.exercise.exerciseName}
              </h2>
              <CldImage
                src={exercise.exercise.image}
                width="300"
                height="200"
                alt={exercise.exercise.exerciseName}
                className="w-full h-48 object-cover mt-2 rounded"
                />
              <div className="mt-2 text-sm text-gray-700">
                <div>
                  <strong>Sequence:</strong>
                  <input
                    type="number"
                    value={exercise.sequenceNum}
                    onChange={(e) => handleInputChange(e, exercise.id, "sequenceNum")}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div>
                  <strong>Reps:</strong>
                  <input
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => handleInputChange(e, exercise.id, "reps")}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div>
                  <strong>Sets:</strong>
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => handleInputChange(e, exercise.id, "sets")}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div>
                  <strong>Duration:</strong>
                  <input
                    type="number"
                    value={exercise.duration}
                    onChange={(e) => handleInputChange(e, exercise.id, "duration")}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div>
                  <strong>Time:</strong>
                  <input
                    type="text"
                    value={exercise.time}
                    onChange={(e) => handleInputChange(e, exercise.id, "time")}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div>
                  <strong>Description:</strong>
                  <textarea
                    value={exercise.description}
                    onChange={(e) => handleInputChange(e, exercise.id, "description")}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <button
                  onClick={() =>
                    handleDeleteExercise(exercise.exercise.exerciseID, exercise.id)
                  }
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
