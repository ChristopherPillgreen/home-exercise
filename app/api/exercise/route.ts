import { getExerciseById } from "./exercise.service";

export async function GET() {
    const exercise = await getExerciseById(2)
    return Response.json(exercise)
}
