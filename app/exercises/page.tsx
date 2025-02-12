"use client";

import { useEffect, useState } from "react";
import { ExerciseCard } from "../components/ExerciseCard";
import Nav from "../components/Sidebar";

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

  // Assuming planID is passed in from parent or set dynamically
  const planID = 1; // Replace with actual planID from your context or props

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
    <div className="flex flex-wrap gap-4 px-4">
      <Nav />
      {exercises.map((exercise) => {
        return (
          <ExerciseCard
            key={exercise.exerciseID}
            exercise={{
              exerciseID: exercise.exerciseID,
              exerciseName: exercise.exerciseName,
              exerciseDescription: '',
              image: exercise.image,
            }}
          />
        );
      })}
    </div>
  );
}
