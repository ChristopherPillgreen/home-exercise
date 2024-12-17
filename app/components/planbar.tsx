"use client";

import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiHeart, HiArrowCircleDown, HiOutlinePencil } from "react-icons/hi";
import { ExerciseCard } from "./ExerciseCard";

type Exercise = {
  exerciseID: number;
  exerciseName: string;
  exerciseDescription: string;
  image: string;
  onAdd: (exerciseID: number) => void;
};

type PlanBarProps = {
  exercises: Exercise[];
};

export default function PlanBar({ exercises }: PlanBarProps) {
  const [planName, setPlanName] = useState("Name Your Plan Here");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar className="h-screen" aria-label="Plan Sidebar">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiOutlinePencil}>
              <input
                type="text"
                value={planName}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Name Your Plan Here"
              />
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowCircleDown}>
              Save and Export
            </Sidebar.Item>

            <Sidebar.Item href="favoriteplans" icon={HiHeart}>
              Favorite Plans
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="flex flex-wrap gap-4 p-4">
        {exercises.length === 0 ? (
          <div>No exercises found.</div>
        ) : (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.exerciseID}
              exercise={exercise}
              onAdd={() => exercise.onAdd(exercise.exerciseID)}
            />
          ))
        )}
      </div>
    </div>
  );
}
