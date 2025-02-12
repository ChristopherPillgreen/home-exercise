// // components/ExerciseCard.tsx
// "use client";

// import { useRouter as router } from "next/router";
// import { useState } from "react";
// import { Card } from "flowbite-react";
// import HeartIcon from "./HeartIcon";
// import PlusIcon from "./PlusIcon";
// import CheckIcon from "./CheckIcon";

// type ExerciseCardProps = {
//   exercise: {
//     exerciseID: number;
//     exerciseName: string;
//     exerciseDescription: string;
//     image: string;
//   };
//   onAdd?: () => void;
// };
// export const DetailedExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onAdd }) => (
//   <div className="card">
//     <h3>{exercise.exerciseName}</h3>
//     <p>{exercise.exerciseDescription}</p>
//     <img src={exercise.image} alt={exercise.exerciseName} />
//     <button onClick={onAdd}>+</button> {/* "Plus" button */}
//   </div>
// );

// export function ExerciseCard({ exercise, onAdd }: ExerciseCardProps) {
//   const [isHeartFilled, setIsHeartFilled] = useState(false);
//   const [isPlusFilled, setIsPlusFilled] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   const toggleHeart = () => {
//     setIsHeartFilled(!isHeartFilled);
//   };
//   const toggleCheck = () => {
//     setIsChecked(!isChecked);
//     console.log(isChecked);
//   };

//   const handleAdd = () => {
//     setIsChecked(true);
//     if (onAdd) {
//       onAdd();
//     }
//   };

//   const handleCardClick = () => {
//     router.push(`/exercises/${exercise.exerciseID}`);
//   };

//   return (
//     <Card
//   className="bg-slate-100 w-48 h-64 border border-gray-300 rounded-lg shadow-md m-2 flex flex-col"
// >
//   <div className="flex-grow-0 h-1/2 overflow-hidden">
//     <img
//       src={exercise.image}
//       alt={exercise.exerciseName}
//       onClick={handleCardClick}
//       className="w-full h-full object-cover"
//     />
//   </div>
//   <div className="flex-grow flex flex-col justify-between p-2">
//     <h5 className="text-lg font-bold tracking-tight text-gray-900">
//       {exercise.exerciseName}
//     </h5>
//     <p className="text-sm text-gray-700 truncate">{exercise.exerciseDescription}</p>
//     <div className="flex justify-between">
//       <button className="w-fit" onClick={toggleHeart}>
//         <HeartIcon filled={isHeartFilled} />
//       </button>
//       <button className="w-fit" onClick={toggleCheck}>
//         {isChecked ? <CheckIcon /> : <PlusIcon />}
//       </button>
//     </div>
//   </div>
//   </Card>
//   );
// }
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
        <button className="w-fit" onClick={toggleCheck}>
          {isChecked ? <CheckIcon /> : <PlusIcon />}
        </button>
      </div>
    </Card>
  );
}
