import { ExerciseCard } from "../components/ExerciseCard";

export default async function Exercises() {
  return (
    <div className="flex flex-wrap px-px h-full">
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
    </div>
  );
}
