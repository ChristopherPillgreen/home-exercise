import { EntityManager } from '@mikro-orm/core';
import { PlanExercise } from '@entities/PlanExercise.entity';
import { Plan } from '@entities/Plan.entity';
import { Exercise } from '@entities/Exercise.entity';

export const getPlanExercises = async (em: EntityManager, planID: number): Promise<PlanExercise[]> => {
  const plan = await em.findOne(Plan, { planID });
  if (!plan) throw new Error('Plan not found');

  return await em.find(PlanExercise, { plan }, { populate: ['exercise'] });
};

export const addExerciseToPlan = async (
  em: EntityManager,
  planID: number,
  exerciseID: number,
  data: Omit<PlanExercise, 'plan' | 'exercise'>
): Promise<PlanExercise> => {
  const plan = await em.findOne(Plan, { planID });
  const exercise = await em.findOne(Exercise, { exerciseID });

  if (!plan) throw new Error('Plan not found');
  if (!exercise) throw new Error('Exercise not found');

  const planExercise = em.create(PlanExercise, { ...data, plan, exercise });
  await em.persistAndFlush(planExercise);
  return planExercise;
};

export const updatePlanExercise = async (
  em: EntityManager,
  planID: number,
  exerciseID: number,
  data: Partial<Omit<PlanExercise, 'plan' | 'exercise'>>
): Promise<PlanExercise | null> => {
  const planExercise = await em.findOne(PlanExercise, { plan: { planID }, exercise: { exerciseID } });
  if (!planExercise) throw new Error('PlanExercise not found');

  em.assign(planExercise, data);
  await em.persistAndFlush(planExercise);
  return planExercise;
};

export const removeExerciseFromPlan = async (
  em: EntityManager,
  planID: number,
  exerciseID: number
): Promise<boolean> => {
  const planExercise = await em.findOne(PlanExercise, { plan: { planID }, exercise: { exerciseID } });
  if (!planExercise) throw new Error('PlanExercise not found');

  await em.removeAndFlush(planExercise);
  return true;
};
