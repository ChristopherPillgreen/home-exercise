import { EntityManager } from '@mikro-orm/core';
import { FavoriteExercise } from '@entities/FavoriteExercise.entity';
import { User } from '@entities/User.entity';
import { Exercise } from '@entities/Exercise.entity';

export const getFavoritesByUser = async (em: EntityManager, userID: number): Promise<FavoriteExercise[]> => {
  const user = await em.findOne(User, { userID });
  if (!user) throw new Error('User not found');

  return await em.find(FavoriteExercise, { user }, { populate: ['exercise'] });
};

export const addFavoriteExercise = async (
  em: EntityManager,
  userID: number,
  exerciseID: number
): Promise<FavoriteExercise> => {
  const user = await em.findOne(User, { userID });
  const exercise = await em.findOne(Exercise, { exerciseID });

  if (!user) throw new Error('User not found');
  if (!exercise) throw new Error('Exercise not found');

  const favorite = em.create(FavoriteExercise, { user, exercise });
  await em.persistAndFlush(favorite);
  return favorite;
};

export const removeFavoriteExercise = async (
  em: EntityManager,
  userID: number,
  exerciseID: number
): Promise<boolean> => {
  const favorite = await em.findOne(FavoriteExercise, { user: { userID }, exercise: { exerciseID } });
  if (!favorite) throw new Error('Favorite not found');

  await em.removeAndFlush(favorite);
  return true;
};
