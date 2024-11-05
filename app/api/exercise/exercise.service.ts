import { Exercise } from "../../../../models/exercise";  // Adjust path if needed

// Get all exercises
export async function getAllExercises() {
  try {
    return await Exercise.findAll();  // Query database to get all exercises
  } catch (error) {
    if (error instanceof Error){
    throw new Error("Error fetching exercises: " + error.message);
    }
  }
}

// Get an exercise by ID
export async function getExerciseById(id: number) {
  try {
    return await Exercise.findByPk(id);  // Query by primary key
  } catch (error) {
    if (error instanceof Error){
    throw new Error(`Error fetching exercise with ID ${id}: ${error.message}`);
    }
  }
}

// Create a new exercise
export async function createExercise(data: any) {
  try {
    return await Exercise.create(data);  // Insert new exercise
  } catch (error) {
    if (error instanceof Error){
    throw new Error("Error creating exercise: " + error.message);
    }
  }
}

// Update an exercise by ID
export async function updateExercise(id: number, data: any) {
  try {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) throw new Error("Exercise not found");

    return await exercise.update(data);  // Update existing exercise
  } catch (error) {
    if (error instanceof Error){
    throw new Error(`Error updating exercise with ID ${id}: ${error.message}`);
    }
  }
}

// Delete an exercise by ID
export async function deleteExercise(id: number) {
  try {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) throw new Error("Exercise not found");

    await exercise.destroy();  // Delete exercise
    return { message: "Exercise deleted successfully" };
  } catch (error) {
    if (error instanceof Error){
    throw new Error(`Error deleting exercise with ID ${id}: ${error.message}`);
    }
  }
}
