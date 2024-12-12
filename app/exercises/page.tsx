import { ExerciseCard } from "../components/ExerciseCard";
import Nav from "../components/Sidebar";

export default async function Exercises() {
  console.log("Fetching exercises...");

  try {
    // Fetch exercises from the API
    const response = await fetch("/api/exercise", {
      method: "GET",
    });

    const exercises = await response.json();

    // Check if exercises were found and render accordingly
    if (!Array.isArray(exercises) || exercises.length === 0) {
      return (
        <div className="flex flex-wrap px-px h-full">
          <Nav />
          <div>No exercises found.</div>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap px-px h-full">
        <Nav />
        {/* Map over the exercises and pass each exercise to the ExerciseCard */}
        {exercises.map((exercise: any) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return (
      <div className="flex flex-wrap px-px h-full">
        <Nav />
        <div>Error fetching exercises.</div>
      </div>
    );
  }
}
