import { InferCreationAttributes } from 'sequelize';
import { Plan  } from '../../../models/Plan';  // Adjust path as needed
import Exercise from '../../../models/Exercise'; // Adjust path as needed
import { Infer } from 'next/dist/compiled/superstruct';

type PlanData = InferCreationAttributes<Plan>;

//interface PlanData {
//  Frequency: number;
 // UserID: number;
//  Favorites?: boolean;
//}


// Service function to create a new plan
export const createPlan = async (data: PlanData) => {
  return await Plan.create(data);
};

// Service function to get all plans
export const getAllPlans = async () => {
  return await Plan.findAll({
    include: { model: Exercise, as: 'exercises' },
  });
};

// Service function to get a plan by ID
export const getPlanById = async (planId: number) => {
  return await Plan.findByPk(planId, {
    include: { model: Exercise, as: 'exercises' },
  });
};

// Service function to update a plan by ID
export const updatePlan = async (planId: number, data: PlanData) => {
  const plan = await Plan.findByPk(planId);
  if (plan) {
    return await plan.update(data);
  }
  throw new Error('Plan not found');
};

// Service function to delete a plan by ID
export const deletePlan = async (planId: number) => {
  const plan = await Plan.findByPk(planId);
  if (plan) {
    await plan.destroy();
    return 'Plan deleted successfully';
  }
  throw new Error('Plan not found');
};
