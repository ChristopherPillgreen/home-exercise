"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Exercise = {
  exerciseID: number;
  exerciseName: string;
  description: string;
};

export default function EditPlanPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { planID } = useParams(); // Get planID from URL

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

  if (loading) return <div className="text-center mt-4">Loading exercises...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercises for Plan {planID}</h1>

      <button
        onClick={() => router.push(`/plans/${planID}/exercises`)} // Updated to go to /plans/[planID]/exercises
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Exercises
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.length === 0 ? (
          <p>No exercises added yet.</p>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.exerciseID} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mt-2">{exercise.exerciseName}</h2>
              <p className="text-gray-600">{exercise.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
