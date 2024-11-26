import { EntityManager } from '@mikro-orm/core';
import { Plan } from '@entities/Plan.entity';
import { User } from '@entities/User.entity';

export const createPlan = async (
  em: EntityManager,
  userID: number,
  data: Omit<Plan, 'planID' | 'user'> // Exclude auto-generated and relational fields
): Promise<Plan> => {
  // Fetch the user to associate with the plan
  const user = await em.findOne(User, { userID });
  if (!user) {
    throw new Error('User not found');
  }

  // Create a new plan associated with the user
  const plan = em.create(Plan, { ...data, user });
  await em.persistAndFlush(plan);
  return plan;
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
