import{ FavoriteExercise }from '@entities/FavoriteExercise.entity';

import { Exercise } from '@entities/Exercise.entity';

import { Op } from 'sequelize';

export async function getUserFavorites(userId: number) {
  return await FavoriteExercise.findAll({
    where: { UserID: userId },
    include: [{ model: Exercise, as: 'exercise' }],
  });
}

export async function addFavorite(userId: number, exerciseId: number) {
  return await FavoriteExercise.create({
    UserID: userId,
    exerciseID: exerciseId,
  });
}

export async function removeFavorite(userId: number, exerciseId: number) {
  return await FavoriteExercise.destroy({
    where: {
      UserID: userId,
      exerciseID: exerciseId,
    },
  });
}

export async function isFavorite(userId: number, exerciseId: number) {
  const favorite = await FavoriteExercise.findOne({
    where: {
      UserID: userId,
      exerciseID: exerciseId,
    },
  });
  return favorite !== null;
}
