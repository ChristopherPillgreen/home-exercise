import { EntityManager } from '@mikro-orm/core';
import { TagExercises } from '@entities/TagExercise.entity';
import { Exercise } from '@entities/Exercise.entity';
import { Tag } from '@entities/Tag.entity';

export const getTagsForExercise = async (em: EntityManager, exerciseID: number): Promise<TagExercises[]> => {
  const exercise = await em.findOne(Exercise, { exerciseID });
  if (!exercise) throw new Error('Exercise not found');

  return await em.find(TagExercises, { exercise }, { populate: ['tag'] });
};

export const getExercisesForTag = async (em: EntityManager, tagID: number): Promise<TagExercises[]> => {
  const tag = await em.findOne(Tag, { tag: tagID });
  if (!tag) throw new Error('Tag not found');

  return await em.find(TagExercises, { tag }, { populate: ['exercise'] });
};

export const addTagToExercise = async (
  em: EntityManager,
  exerciseID: number,
  tagID: number
): Promise<TagExercises> => {
  const exercise = await em.findOne(Exercise, { exerciseID });
  const tag = await em.findOne(Tag, { tag: tagID });

  if (!exercise) throw new Error('Exercise not found');
  if (!tag) throw new Error('Tag not found');

  const tagExercise = em.create(TagExercises, { exercise, tag });
  await em.persistAndFlush(tagExercise);
  return tagExercise;
};

export const removeTagFromExercise = async (
  em: EntityManager,
  exerciseID: number,
  tagID: number
): Promise<boolean> => {
  const tagExercise = await em.findOne(TagExercises, { exercise: { exerciseID }, tag: { tag: tagID } });
  if (!tagExercise) throw new Error('TagExercise not found');

  await em.removeAndFlush(tagExercise);
  return true;
};
