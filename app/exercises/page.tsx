
"use client";

import { useEffect, useState } from "react";
import { ExerciseCard } from "../components/ExerciseCard";
import Nav from "../components/Sidebar";

type Exercise = {
  exerciseID: number; // Matches your backend entity
  exerciseName: string;
  exerciseDescription: string;
  image: string;
};
const handleAddToPlan = async (exerciseID: number) => {
  try {
    const response = await fetch("http://localhost:3000/api/plan/addExercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exerciseID, planID: 1 }), // Replace `1` with the actual plan ID
    });

    if (!response.ok) {
      throw new Error("Failed to add exercise to plan");
    }

    alert("Exercise added to plan!");
  } catch (err) {
    console.error("Error adding exercise to plan:", err);
    alert("Failed to add exercise to plan.");
  }
};

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      console.log("Fetching exercises...");

      try {
        const response = await fetch("http://localhost:3000/api/exercise", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched exercises:", data); // Log the API response
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

  // Log state updates whenever `exercises` changes
  useEffect(() => {
    console.log("Exercises state updated:", exercises); // Log the exercises array
  }, [exercises]);

  if (loading) {
    return (
      <div className="flex flex-wrap px-px h-full">
        <Nav />
        <div>Loading exercises...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-wrap px-px h-full">
        <Nav />
        <div>{error}</div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex flex-wrap px-px h-full">
        <Nav />
        <div>No exercises found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center px-4">
  <Nav />
  {exercises.map((exercise) => {

    return (
      <ExerciseCard
        key={exercise.exerciseID}
        exercise={{
          exerciseID: exercise.exerciseID,
          exerciseName: exercise.exerciseName,
          exerciseDescription: exercise.exerciseDescription,
          image: exercise.image,
        }}
        onAdd={() => handleAddToPlan(exercise.exerciseID)}
      />
    );
  })}
</div>
  );
}
