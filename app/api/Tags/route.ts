import Tag from '../../../models/Tag';
import { Exercise } from '../../../models/Exercise';

// Get all tags
export async function getAllTags(withExercises: boolean = false) {
  try {
    return await Tag.findAll({
      include: withExercises ? [{ model: Exercise, as: 'exercises' }] : [],
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Could not fetch tags');
  }
}

// Get a specific tag by ID
export async function getTagById(tagID: number, withExercises: boolean = false) {
  try {
    const tag = await Tag.findByPk(tagID, {
      include: withExercises ? [{ model: Exercise, as: 'exercises' }] : [],
    });
    if (!tag) throw new Error('Tag not found');
    return tag;
  } catch (error) {
    console.error(`Error fetching tag with ID ${tagID}:`, error);
    throw error;
  }
}

// Create a new tag
export async function createTag(tagName: string) {
  try {
    return await Tag.create({ tagName });
  } catch (error) {
    console.error('Error creating tag:', error);
    throw new Error('Could not create tag');
  }
}

// Update an existing tag
export async function updateTag(tagID: number, tagName: string) {
  try {
    const tag = await Tag.findByPk(tagID);
    if (!tag) throw new Error('Tag not found');
    return await tag.update({ tagName });
  } catch (error) {
    console.error(`Error updating tag with ID ${tagID}:`, error);
    throw error;
  }
}

// Delete a tag
export async function deleteTag(tagID: number) {
  try {
    const tag = await Tag.findByPk(tagID);
    if (!tag) throw new Error('Tag not found');
    await tag.destroy();
    return { message: 'Tag deleted successfully' };
  } catch (error) {
    console.error(`Error deleting tag with ID ${tagID}:`, error);
    throw error;
  }
}
