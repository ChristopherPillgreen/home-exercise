import Exercise from '../../../models/Exercise'; // Adjust the path as needed

// Get all exercises
export async function getAllExercises() {
  try {
    return await Exercise.findAll({
      include: ['tags'], // Use aliases defined in associations
    });
  } catch (error) {
    throw new Error(`Error fetching exercises: ${(error as Error).message}`);
  }
}

// Get a specific exercise by ID
export async function getExerciseById(exerciseID: number) {
  try {
    const exercise = await Exercise.findByPk(exerciseID, {
      include: ['plans', 'tags'], // Use aliases defined in associations
    });
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    return exercise;
  } catch (error) {
    throw new Error(`Error fetching exercise with ID ${exerciseID}: ${(error as Error).message}`);
  }
}

// Create a new exercise
export async function createExercise(data: {
  exerciseName: string;
  exerciseDescription: string;
  exerciseImage?: Buffer;
}) {
  try {
    return await Exercise.create(data);
  } catch (error) {
    throw new Error(`Error creating exercise: ${(error as Error).message}`);
  }
}

// Update an exercise by ID
export async function updateExercise(exerciseID: number, data: Partial<{
  exerciseName: string;
  exerciseDescription: string;
  exerciseImage?: Buffer;
}>) {
  try {
    const exercise = await Exercise.findByPk(exerciseID);
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    return await exercise.update(data);
  } catch (error) {
    throw new Error(`Error updating exercise with ID ${exerciseID}: ${(error as Error).message}`);
  }
}

// Delete an exercise by ID
export async function deleteExercise(exerciseID: number) {
  try {
    const exercise = await Exercise.findByPk(exerciseID);
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    await exercise.destroy();
    return { message: 'Exercise deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting exercise with ID ${exerciseID}: ${(error as Error).message}`);
  }
}

