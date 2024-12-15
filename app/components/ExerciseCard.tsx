// components/ExerciseCard.tsx
"use client";

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
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
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

  return (
    <Card
  className="bg-slate-100 w-64 h-auto border border-gray-300 rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 hover:shadow-lg"
  imgAlt={exercise.exerciseName}
  imgSrc={exercise.image}
>
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {exercise.exerciseName}
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400">
    {exercise.exerciseDescription}
  </p>
  <div className="flex justify-between">
    <button className="w-fit" onClick={toggleHeart}>
      <HeartIcon filled={isHeartFilled} />
    </button>
    <button className="w-fit" onClick={toggleCheck}>
      {isChecked ? <CheckIcon /> : <PlusIcon />}
    </button>
  </div>
</Card>
  );
}
