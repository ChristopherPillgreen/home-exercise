import { EntityManager } from '@mikro-orm/core';
import { Plan } from '@entities/Plan.entity';
import { User } from '@entities/User.entity';
import { orm } from "mikro-orm.config";
import { PlanExercise } from '@entities/PlanExercise.entity';
import { Exercise } from '@entities/Exercise.entity';

export const createPlan = async (em: EntityManager, userID: number, data: { frequency: number; favorites:boolean}) => {


  // Fetch the user to associate with the plan
  const user = await em.findOne(User, { userID });
  if (!user) {
    throw new Error("User not found");
  }

  // Create a new plan associated with the user
  //console.log(em.getMetadata().get('Plan'));
  const plan = em.create(Plan, { 
    frequency: data.frequency, 
    favorites: data.favorites, 
    user });
  await em.persistAndFlush(plan);

  return plan;
};

export const addExerciseToPlan = async (em: EntityManager, planID: number, exerciseID: number, data: Partial<PlanExercise>) => {
  //const em = (await orm).em.fork();
  console.log('Fetching plan and exercise... ');
  // Fetch the plan and populate exercises if needed
  const plan = await em.findOne(Plan, { planID }, { populate: ["planExercises.exercise"] });
  const exercise = await em.findOne(Exercise, { exerciseID });

  if (!plan) {
    throw new Error("Plan not found");
  }
  if (!exercise) {
    throw new Error("Exercise not found");
  }

  console.log('Plan:', plan);
  console.log('Exercise', exercise);

  // Check if the exercise is already in the plan
  const existing = plan.planExercises.getItems().find((pe) => pe.exercise.exerciseID === exerciseID);
  if (existing) {
    throw new Error("Exercise is already added to the plan");
  }

  console.log('Creating new planexercise..')

  // Create a new PlanExercise instance
  const planExercise = em.create(PlanExercise, {
    sequenceNum: data.sequenceNum ?? 1,
    reps: data.reps ?? 10,
    sets: data.sets ?? 3,
    duration: data.duration ?? 60,
    time: data.time ?? 0,
    plan,
    exercise,
  });

  console.log('planexercise: ', planExercise);

  // Persist and flush the new PlanExercise
  await em.persistAndFlush(planExercise);

  return planExercise;
}
/**
 * Get all exercises for a specific plan
 */
export const getExercisesForPlan = async (em: EntityManager, planID: number) => {
  //const em = (await orm).em.fork();

  // Fetch the plan and populate exercises
  const plan = await em.findOne(Plan, { planID }, { populate: ["planExercises.exercise"] });

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
  return await em.findOne(Plan, { planID }, { populate: ['user', 'planExercises'] });
};

export const getAllPlans = async (em: EntityManager): Promise<Plan[]> => {
  // Fetch all plans with user relationships
  return await em.find(Plan, {}, { populate: ['user'] });
};

export const updatePlan = async (
  em: EntityManager,
  planID: number,
  data: Partial<Omit<Plan, 'planID' | 'user'>>
): Promise<Plan | null> => {
  // Fetch the plan to update
  const plan = await getPlanById(em, planID);
  if (!plan) {
    throw new Error('Plan not found');
  }

  // Update the plan with new data
  em.assign(plan, data);
  await em.persistAndFlush(plan);
  return plan;
};

export const deletePlan = async (em: EntityManager, planID: number): Promise<boolean> => {
  // Fetch the plan to delete
  const plan = await getPlanById(em, planID);
  if (!plan) {
    throw new Error('Plan not found');
  }

  // Remove the plan
  await em.removeAndFlush(plan);
  return true;
};
