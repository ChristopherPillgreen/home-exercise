import { EntityManager } from '@mikro-orm/core';
import { Tag } from '@entities/Tag.entity';
//import { Exercise } from '@entities/Exercise.entity';

// Fetch all tags, with optional associated exercises
export const getAllTags = async (em: EntityManager, withExercises: boolean = false): Promise<Tag[]> => {
  return await em.find(Tag, {}, { populate: withExercises ? ['tagExercises.exercise'] : [] });
};

// Fetch a specific tag by primary key (`tag`), with optional associated exercises
export const getTagById = async (em: EntityManager, tag: number, withExercises: boolean = false): Promise<Tag | null> => {
  return await em.findOne(Tag, { tag }, { populate: withExercises ? ['tagExercises.exercise'] : [] });
};

// Create a new tag
export const createTag = async (em: EntityManager, tagName: string): Promise<Tag> => {
  const tagEntity = em.create(Tag, { tagName });
  await em.persistAndFlush(tagEntity);
  return tagEntity;
};

// Update an existing tag by primary key (`tag`)
export const updateTag = async (em: EntityManager, tag: number, tagName: string): Promise<Tag | null> => {
  const tagEntity = await getTagById(em, tag); // Use the existing function to fetch by `tag`
  if (!tagEntity) throw new Error('Tag not found');
  tagEntity.tagName = tagName;
  await em.flush();
  return tagEntity;
};

// Delete a tag by primary key (`tag`)
export const deleteTag = async (em: EntityManager, tag: number): Promise<boolean> => {
  const tagEntity = await getTagById(em, tag); // Use the existing function to fetch by `tag`
  if (!tagEntity) throw new Error('Tag not found');
  await em.removeAndFlush(tagEntity);
  return true;
};
