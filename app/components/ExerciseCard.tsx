"use client";

import { useState } from "react";
import { Card } from "flowbite-react";
import HeartIcon from "./HeartIcon";
import PlusIcon from "./PlusIcon";

// Define the ExerciseCardProps type
type ExerciseCardProps = {
  exercise: {
    exerciseID: number;
    exerciseName: string;
    exerciseDescription: string;
    image: string;
  };
  onAdd?: () => void;
};

export const DetailedExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onAdd,
}) => (
  <div className="card">
    <h3>{exercise.exerciseName}</h3>
    <p>{exercise.exerciseDescription}</p>
    <img src={exercise.image} alt={exercise.exerciseName} />
    <button onClick={onAdd} className="focus:outline-none active:bg-transparent">+</button> {/* "Plus" button */}
  </div>
);

export function ExerciseCard({ exercise, onAdd }: ExerciseCardProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <Card className="bg-slate-100 w-48 h-64 max-h-64 border border-gray-300 rounded-lg shadow-md m-2 flex flex-col">
      {/* Image Container */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={exercise.image}
          alt={exercise.exerciseName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and Description */}
      <div className="p-2 flex-grow">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {exercise.exerciseName}
        </h5>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
          {exercise.exerciseDescription}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between p-2">
        <button className="w-fit" onClick={toggleHeart}>
          <HeartIcon filled={isHeartFilled} />
        </button>
        <button className="w-fit focus:outline-none active:bg-transparent" onClick={onAdd}>
          <PlusIcon />
        </button>
      </div>
    </Card>
  );
}
