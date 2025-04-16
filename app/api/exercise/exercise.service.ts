import { EntityManager,MikroORM } from '@mikro-orm/core';
import { Exercise } from '@entities/Exercise.entity';
import { TagExercises } from '@entities/TagExercise.entity';
import { PlanExercise } from '@entities/PlanExercise.entity';
import { FavoriteExercise } from '@entities/FavoriteExercise.entity';


export async function getAllExercises(em: EntityManager) {

  console.log('getAllExercises');

  try {
    return await em.find(Exercise, {}, {
      populate: ['tagExercise', 'planExercises', 'favoriteExercises'],
    });
  } catch (error) {
    throw new Error(`Error fetching exercises: ${(error as Error).message}`);
  }
  
}

export async function getExerciseById(em: EntityManager, exerciseID: number) {
  console.log('get by ID');
  try {
    const exercise = await em.findOne(Exercise, { exerciseID }, {
      populate: ['tagExercise', 'planExercises', 'favoriteExercises'],
    });

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    return exercise;
  } catch (error) {
    throw new Error(`Error fetching exercise with ID ${exerciseID}: ${(error as Error).message}`);
  }
}

export async function createExercise(
  
  em: EntityManager,
  data: { exerciseName: string; exerciseDescription: string; image: string}
) {
  try {
    
    const exercise = em.create(Exercise, data);
    await em.persistAndFlush(exercise);
    return exercise;
  } catch (error) {
    throw new Error(`Error creating exercise: ${(error as Error).message}`);
  }
}

export async function updateExercise(
  em: EntityManager,
  exerciseID: number,
  data: Partial<{ exerciseName: string; exerciseDescription: string }>
) {
  try {
    
    const exercise = await em.findOne(Exercise, { exerciseID });
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    Object.assign(exercise, data);
    await em.flush();
    return exercise;
  } catch (error) {
    throw new Error(`Error updating exercise with ID ${exerciseID}: ${(error as Error).message}`);
  }
}

export async function deleteExercise(em: EntityManager, exerciseID: number) {
  try {
    
    const exercise = await em.findOne(Exercise, { exerciseID });
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    await em.removeAndFlush(exercise);
    return { message: 'Exercise deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting exercise with ID ${exerciseID}: ${(error as Error).message}`);
  }
}
