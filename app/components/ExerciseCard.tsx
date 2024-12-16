// components/ExerciseCard.tsx
"use client";

import { useRouter as router } from "next/router";
import { useState } from "react";
import { Card } from "flowbite-react";
import HeartIcon from "./HeartIcon";
import PlusIcon from "./PlusIcon";
import CheckIcon from "./CheckIcon";

type ExerciseCardProps = {
  exercise: {
    exerciseID: number;
    exerciseName: string;
    exerciseDescription: string;
    image: string;
  };
  onAdd?: () => void;
};
export const DetailedExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onAdd }) => (
  <div className="card">
    <h3>{exercise.exerciseName}</h3>
    <p>{exercise.exerciseDescription}</p>
    <img src={exercise.image} alt={exercise.exerciseName} />
    <button onClick={onAdd}>+</button> {/* "Plus" button */}
  </div>
);



export function ExerciseCard({ exercise, onAdd }: ExerciseCardProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isPlusFilled, setIsPlusFilled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const toggleCheck = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };


  const handleAdd = () => {
    setIsChecked(true);
    if (onAdd) {
      onAdd();
    }
  };

  const handleCardClick = () => {
    router.push(`/exercises/${exercise.exerciseID}`);
  };

  return (
    <Card
      className="bg-slate-100 w-48 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-md m-2 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
      imgAlt={exercise.exerciseName}
      imgSrc={exercise.image}
      onClick={handleCardClick} // Trigger navigation when card is clicked
    >
      <h5 className="text-lg font-bold tracking-tight text-gray-900">
        {exercise.exerciseName}
      </h5>
      <p className="text-sm font-normal text-gray-700 truncate">
        {exercise.exerciseDescription}
      </p>
      <div className="flex justify-between">
        <button className="w-fit" onClick={(e) => e.stopPropagation()}>
          <HeartIcon filled={false} />
        </button>
        <button className="w-fit" onClick={(e) => e.stopPropagation()}>
          <PlusIcon />
        </button>
      </div>
    </Card>
  );
}
