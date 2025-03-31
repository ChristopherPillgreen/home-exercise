import { EntityManager } from "@mikro-orm/core";
import { PlanExercise } from "@entities/PlanExercise.entity";
import { Plan } from "@entities/Plan.entity";
import { Exercise } from "@entities/Exercise.entity";
import { User } from "@entities/User.entity";

export const getPlanExercises = async (
  em: EntityManager,
  planID: number,
  userID: string
): Promise<PlanExercise[]> => {
  const plan = await em.findOne(Plan, { planID, user: {userID} });
  if (!plan) throw new Error("Plan not found or unauthorized access");

  // Fetch PlanExercise with populated Exercise relation
  const planExercises = await em.find(PlanExercise, { plan }, { populate: ["exercise"] });

  // Add the exercise name to each PlanExercise
  return planExercises.map((planExercise) => ({
    ...planExercise,
    exerciseName: planExercise.exercise.exerciseName, 
    exerciseDescription: planExercise.exercise.exerciseDescription,
    exerciseImage: planExercise.exercise.image,
  }));
};


export const addExerciseToPlan = async (
  em: EntityManager,
  planID: number,
  exerciseID: number,
  userID: string,
  data: Omit<PlanExercise, "plan" | "exercise">
): Promise<PlanExercise> => {
  const plan = await em.findOne(Plan, { planID, user: {userID} });
  const exercise = await em.findOne(Exercise, { exerciseID });

  if (!plan) throw new Error("Plan not found");
  if (!exercise) throw new Error("Exercise not found");

  // Automatically set the description field from exerciseDescription if it's not provided
  const planExerciseData = {
    ...data,
    plan,
    exercise,
    description: data.description || exercise.exerciseDescription, // Set default to exerciseDescription
  };

  const planExercise = em.create(PlanExercise, planExerciseData);
  await em.persistAndFlush(planExercise);
  return planExercise;
};


export const updatePlanExercise = async (
  em: EntityManager,
  planID: number,
  exerciseID: number,
  userID: string,
  data: Partial<Omit<PlanExercise, "plan" | "exercise">>
): Promise<PlanExercise | null> => {
  const planExercise = await em.findOne(PlanExercise, {
    plan: { planID, user: { userID } },
    exercise: { exerciseID },
  });
  if (!planExercise) throw new Error("PlanExercise not found");

  em.assign(planExercise, data);
  await em.persistAndFlush(planExercise);
  return planExercise;
};
// export const updatePlanExercise = async (
//   em: EntityManager,
//   id: number,  // The primary key (ID) of the PlanExercise entry
//   userID: string,
//   planID: number,
//   exerciseID: number,
//   data: Partial<Omit<PlanExercise, "plan" | "exercise">>
// ): Promise<PlanExercise | null> => {
//   console.log("Received PlanExercise id:", id);  // Log the incoming PlanExercise ID

//   // Fetch the PlanExercise entry using its primary key (id)
//   const planExercise = await em.findOne(PlanExercise, { id }, { populate: ["plan", "exercise"] });

//   console.log("PlanExercise found:", planExercise);

//   // If PlanExercise is not found or doesn't have the associated plan or user
//   if (!planExercise || !planExercise.plan || !planExercise.plan.user) {
//     throw new Error("PlanExercise not found or unauthorized access");
//   }

//   // Ensure the userID in the plan matches the given userID
//   if (planExercise.plan.user.userID !== userID) {
//     throw new Error("Unauthorized access");
//   }

//   // Update the PlanExercise with the provided data
//   em.assign(planExercise, data);

//   // Persist and flush the changes
//   await em.persistAndFlush(planExercise);

//   return planExercise;
// };
  


export const removeExerciseFromPlan = async (
  em: EntityManager,
  planID: number,
  exerciseID: number,
  userID: string
): Promise<boolean> => {
  const planExercise = await em.findOne(PlanExercise, {
    plan: { planID, user: { userID } },
    exercise: { exerciseID },
  });
  if (!planExercise) throw new Error("PlanExercise not found or unauthorized access");

  await em.removeAndFlush(planExercise);
  return true;
};
