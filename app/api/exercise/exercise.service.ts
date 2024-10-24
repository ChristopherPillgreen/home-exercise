import { Exercise } from "../../../../models/exercise"

export async function getExerciseById(id: number) {
    // interaction with db
    const exercise = await Exercise.findByPk(id);
    return exercise
    
}