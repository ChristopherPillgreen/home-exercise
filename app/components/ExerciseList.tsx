"use client";

import { useState } from "react";
import { ExerciseCard } from "./ExerciseCard";

export function ExerciseList() {
  const [plan, setPlan] = useState<number[]>([]); // Stores IDs of exercises in the plan

  const exercises = [
    {
      exerciseID: 1,
      exerciseName: "Push-Up",
      exerciseDescription: "A great upper body exercise.",
      image: "https://example.com/push-up.png",
    },
    {
      exerciseID: 2,
      exerciseName: "Squat",
      exerciseDescription: "Builds lower body strength.",
      image: "https://example.com/squat.png",
    },
  ];

  const handleAddToPlan = (exerciseID: number) => {
    if (!plan.includes(exerciseID)) {
      setPlan([...plan, exerciseID]); // Add the exercise to the plan
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Exercise List</h1>
      <div className="grid grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.exerciseID}
            exercise={exercise}
            onAdd={() => handleAddToPlan(exercise.exerciseID)}
          />
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Plan</h2>
        {plan.length > 0 ? (
          <ul>
            {plan.map((id) => (
              <li key={id}>Exercise ID: {id}</li>
            ))}
          </ul>
        ) : (
          <p>No exercises added to the plan yet.</p>
        )}
      </div>
    </div>
  );
}
