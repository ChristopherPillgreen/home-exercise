"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// type Exercise = {
//   id: number;
//   sequenceNum: number;
//   reps: number;
//   sets: number;
//   duration: number;
//   time: string;
//   description: string;
//   exerciseID: number;
//   exerciseName: string;
//   exerciseDescription: string;
//   exerciseImage: string;
// };

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
  };

export default function EditPlanPage() {
  const [planExercises, setPlanExercises] = useState<PlanExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, exerciseId: number, field: string) => {
    setPlanExercises(planExercises.map((exercise) =>
      exercise.id === exerciseId ? { ...exercise, [field]: e.target.value } : exercise
    ));
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
      console.log('Exercise deleted successfully');
      // Update the UI to remove the exercise using the id from planexercise table
      setPlanExercises(planExercises.filter((exercise) => exercise.id !== id));

    } else {
      console.error('Failed to delete exercise');
    }
  } catch (error) {
    console.error('Error:', error);
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
        exercises: planExercises.map((ex: PlanExercise) => ({
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
    alert("Plan saved successfully!");
  } catch (err: any) {
    console.log(
  planExercises.map((ex: PlanExercise) => ({
    id: ex.id,  // This should be the primary key of plan_exercise
    planID: ex.plan?.planID,  // This should be the plan's ID
    exerciseID: ex.exercise?.exerciseID,  // This should be the exercise's ID
  }))
);

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
        {planExercises.length === 0 ? (
          <p>No exercises added yet.</p>
        ) : (
          planExercises.map((exercise: PlanExercise) => (
            <div key={exercise.id} className="border p-4 rounded shadow relative">
              <h2 className="text-xl font-semibold mt-2">{exercise.exercise.exerciseName}</h2>
              <img
                src={exercise.exercise.image}
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

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteExercise(exercise.exercise.exerciseID, exercise.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
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
