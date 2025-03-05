"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Exercise = {
  id: number;
  sequenceNum: number;
  reps: number;
  sets: number;
  duration: number;
  time: string;
  description: string;
  exerciseName: string;
  exerciseDescription: string;
  exerciseImage: string; // Image URL or path
};

export default function EditPlanPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { planID } = useParams();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/planexercise?planID=${planID}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [planID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, exerciseId: number, field: string) => {
    const newExercises = exercises.map((exercise) =>
      exercise.id === exerciseId
        ? { ...exercise, [field]: e.target.value }
        : exercise
    );
    setExercises(newExercises);
  };

  const savePlan = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/Plan", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planID, exercises }),
      });

      if (!response.ok) {
        throw new Error("Failed to save plan");
      }

      alert("Plan saved successfully!");
    } catch (err) {
      console.error("Error saving plan:", err);
      alert("Failed to save plan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading exercises...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercises for Plan {planID}</h1>

      <button
        onClick={() => router.push(`/plans/${planID}/exercises`)}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Exercises
      </button>

      <button
        onClick={savePlan}
        disabled={saving}
        className={`ml-4 bg-blue-500 text-white py-2 px-4 rounded mb-4 ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {saving ? "Saving..." : "Save Plan"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.length === 0 ? (
          <p>No exercises added yet.</p>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mt-2">{exercise.exerciseName}</h2> {/* Display exerciseName */}
              <img
                src={exercise.exerciseImage}
                alt={exercise.exerciseName}
                className="w-full h-48 object-cover mt-2 rounded"
              /> {/* Display exerciseImage */}

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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
