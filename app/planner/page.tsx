"use client";

import { useEffect, useState } from "react";
import PlanBar from "app/components/planbar";

type Exercise = {
  exerciseID: number;
  exerciseName: string;
  exerciseDescription: string;
  image: string;
  onAdd: (exerciseID: number) => void;
};

export default function Planner() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAddToPlan = async (exerciseID: number) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/plan/addExercise",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exerciseID, planID: 1 }),
        }
      );

      if (!response.ok) throw new Error("Failed to add exercise to plan");

      alert("Exercise added to plan!");
    } catch (err) {
      console.error("Error adding exercise to plan:", err);
      alert("Failed to add exercise to plan.");
    }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/exercise");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setExercises(
          data.map((exercise: Exercise) => ({
            ...exercise,
            onAdd: handleAddToPlan,
          }))
        );
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Failed to fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>{error}</div>;

  return <PlanBar exercises={exercises} />;
}
