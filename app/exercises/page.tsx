import { ExerciseCard } from "../components/ExerciseCard";
import Nav from "../components/Sidebar";

export default async function Exercises() {
  return (
    <div className="flex flex-wrap px-px h-full">
      <Nav />
      <ExerciseCard />
      <ExerciseCard />
      <ExerciseCard />
    </div>
  );
}
