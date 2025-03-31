"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExerciseCard } from "../../../components/ExerciseCard";
import Nav from "../../../components/Sidebar";

type Exercise = {
  exerciseID: number;
  exerciseName: string;
  exerciseDescription: string;
  image: string;
};

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { planID } = useParams(); // Get plan ID from URL

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercise");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
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
  }, []);

  const handleAddExercise = async (exerciseID: number) => {
    try {
      const planIDNumber = Number(planID);
      if (isNaN(planIDNumber)) {
        alert("Invalid Plan ID.");
        return;
      }

      const response = await fetch(`/api/planexercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planID: planIDNumber, exerciseID }),
      });

      if (!response.ok) {
        throw new Error("Failed to add exercise to plan.");
      }

      // alert("Exercise added successfully!");
    } catch (err) {
      console.error("Error adding exercise:", err);
      alert("Failed to add exercise.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-wrap px-4 h-full">
        <Nav />
        <div>Loading exercises...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-wrap px-4 h-full">
        <Nav />
        <div>{error}</div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex flex-wrap px-4 h-full">
        <Nav />
        <div>No exercises found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 px-4">
      <Nav />
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.exerciseID}
          exercise={exercise}
          onAdd={() => handleAddExercise(exercise.exerciseID)}
        />
      ))}
    </div>
  );
}
