//import { Tag } from '../../../models/Tag'; // Adjust the path if your models are elsewhere
//import { Exercise } from '../../../models'; // Assuming Exercise model exists for association
const Exercise = require('../../../models/exercise');
const Tag = require('../../../models/Tag');
class TagService {
  // Fetch all tags with optional associated exercises
  static async getAllTags(withExercises: boolean = false) {
    try {
      const tags = await Tag.findAll({
        include: withExercises ? [{ model: Exercise, as: 'exercises' }] : [],
      });
      return tags;
    } catch (error) {
      throw new Error(`Error fetching tags: ${(error as Error).message}`);
    }
  }

  // Get a specific tag by ID
  static async getTagById(tagID: number, withExercises: boolean = false) {
    try {
      const tag = await Tag.findByPk(tagID, {
        include: withExercises ? [{ model: Exercise, as: 'exercises' }] : [],
      });
      return tag;
    } catch (error) {
      throw new Error(`Error fetching tag with ID ${tagID}: ${(error as Error).message}`);
    }
  }

  // Create a new tag
  static async createTag(tagName: string) {
    try {
      const tag = await Tag.create({ tagName });
      return tag;
    } catch (error) {
      throw new Error(`Error creating tag: ${(error as Error).message}`);
    }
  }

  // Update an existing tag
  static async updateTag(tagID: number, tagName: string) {
    try {
      const tag = await Tag.findByPk(tagID);
      if (tag) {
        tag.tagName = tagName;
        await tag.save();
        return tag;
      } else {
        throw new Error(`Tag with ID ${tagID} not found`);
      }
    } catch (error) {
      throw new Error(`Error updating tag: ${(error as Error).message}`);
    }
  }

  // Delete a tag
  static async deleteTag(tagID: number) {
    try {
      const tag = await Tag.findByPk(tagID);
      if (tag) {
        await tag.destroy();
        return true;
      } else {
        throw new Error(`Tag with ID ${tagID} not found`);
      }
    } catch (error) {
      throw new Error(`Error deleting tag: ${(error as Error).message}`);
    }
  }
}

export default TagService;
