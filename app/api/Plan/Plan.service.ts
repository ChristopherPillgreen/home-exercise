import { EntityManager, RequiredEntityData } from "@mikro-orm/core";

import { Plan } from "@entities/Plan.entity";
import { User } from "@entities/User.entity";

import { PlanExercise } from "@entities/PlanExercise.entity";
import { Exercise } from "@entities/Exercise.entity";

export const createPlan = async (
  em: EntityManager,
  userID: string,
  data: { frequency: number; favorites: boolean; planName : string }
) => {
  // Fetch the user to associate with the plan
  const user = await em.findOne(User, { userID });
  if (!user) {
    throw new Error("User not found");
  }

  // Exclude planID from the required fields
  const planData: { frequency: number; favorites: boolean; user: User; planName : string } = {
    frequency: data.frequency,
    favorites: data.favorites,
    user,
    planName: data.planName,
  };

  // Create a new plan associated with the user
  const plan = em.create(Plan, planData as any);
  await em.persistAndFlush(plan);

  return plan;
};

export const removeExerciseFromPlan = async (
  em: EntityManager,
  planID: number,
  exerciseID: number
) => {
  // Find the PlanExercise entry
  const planExercise = await em.findOne(PlanExercise, {
    plan: { planID },
    exercise: { exerciseID },
  });

  if (!planExercise) {
    throw new Error("Exercise not found in the plan");
  }

  // Remove the PlanExercise entry
  await em.removeAndFlush(planExercise);

  return { message: "Exercise removed from the plan successfully" };
};
export const addExerciseToPlan = async (
  em: EntityManager,
  planID: number,
  exerciseID: number,
  data: {
    sequenceNum?: number;
    reps?: number;
    sets?: number;
    duration?: number;
    time?: number;
  }
) => {
  // Fetch the plan
  const plan = await em.findOne(Plan, { planID });
  if (!plan) {
    throw new Error("Plan not found");
  }

  // Fetch the exercise (we assume it exists based on your clarification)
  const exercise = await em.findOne(Exercise, { exerciseID });
  if (!exercise) {
    throw new Error("Exercise not found");
  }

  // Create a new PlanExercise entry without checking for duplicates
  const planExercise = em.create(PlanExercise, {
    plan,
    exercise,
    // Removed 'user' as it is not a valid property of PlanExercise
    sequenceNum: data.sequenceNum ?? 1,
    reps: data.reps ?? 10,
    sets: data.sets ?? 3,
    duration: data.duration ?? 0,
    time: data.time ?? 0,
    
  });

  // Add the new PlanExercise to the plan's collection (no check for duplicates)
  plan.planExercises.add(planExercise);

  // Persist the changes
  await em.persistAndFlush(plan);

  return planExercise;
};


export const getPlansByUserId = async (
  em: EntityManager,
  userID: string
): Promise<Plan[]> => {
  return await em.find(Plan, { user: {userID } }, { populate: ["user"]});
}

export const getExercisesForPlan = async (
  em: EntityManager,
  planID: number
) => {
  //const em = (await orm).em.fork();

  // Fetch the plan and populate exercises
  const plan = await em.findOne(
    Plan,
    { planID },
    { populate: ["planExercises.exercise"] }
  );

  if (!plan) {
    throw new Error("Plan not found");
  }

  // Convert the Collection to an array and return
  return plan.planExercises.getItems();
};

export const getPlanById = async (
  em: EntityManager,
  planID: number
): Promise<Plan | null> => {
  // Fetch plan by ID with populated relationships
  return await em.findOne(
    Plan,
    { planID },
    { populate: ["user", "planExercises"] }
  );
};

export const getAllPlans = async (em: EntityManager): Promise<Plan[]> => {
  // Fetch all plans with user relationships
  return await em.find(Plan, {}, { populate: ["user"] });
};

export const updatePlan = async (
  em: EntityManager,
  planID: number,
  data: Partial<Omit<Plan, "planID" | "user">>
): Promise<Plan | null> => {
  // Fetch the plan to update
  const plan = await getPlanById(em, planID);
  if (!plan) {
    throw new Error("Plan not found");
  }

  // Update the plan with new data
  em.assign(plan, data);
  await em.persistAndFlush(plan);
  return plan;
};

export const deletePlan = async (
  em: EntityManager,
  planID: number
): Promise<boolean> => {
  // Fetch the plan to delete
  const plan = await getPlanById(em, planID);
  if (!plan) {
    throw new Error("Plan not found");
  }

  // Remove the plan
  await em.removeAndFlush(plan);
  return true;
};
