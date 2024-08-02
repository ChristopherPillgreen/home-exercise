import { ExerciseCard } from "../components/ExerciseCard";
import { db } from "@/db";

export default async function Exercises() {
  const exercises = await db.query.exercisesTable.findMany();
  console.log(exercises);
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
