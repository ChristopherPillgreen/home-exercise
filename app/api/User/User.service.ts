// import { User } from '../../../models/User';


// // Get all users from the database.
 
// export async function getAllUsers() {
//   try {
//     return await User.findAll();
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw new Error('Could not fetch users');
//   }
// }


// // Get a user by ID.

// export async function getUserById(id: number) {
//   try {
//     const user = await User.findByPk(id);
//     if (!user) throw new Error('User not found');
//     return user;
//   } catch (error) {
//     console.error(`Error fetching user with ID ${id}:`, error);
//     throw error;
//   }
// }


// // Create a new user.
 
// export async function createUser(data: { userFirstName: string; userLastName: string; userEmail: string; userPassword: string }) {
//   try {
//     return await User.create(data);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw new Error('Could not create user');
//   }
// }


// // Update an existing user by ID.
 
// export async function updateUser(id: number, data: any) {
//   try {
//     const user = await User.findByPk(id);
//     if (!user) throw new Error('User not found');
//     return await user.update(data);
//   } catch (error) {
//     console.error(`Error updating user with ID ${id}:`, error);
//     throw error;
//   }
// }


// // Delete a user by ID.

// export async function deleteUser(id: number) {
//   try {
//     const user = await User.findByPk(id);
//     if (!user) throw new Error('User not found');
//     await user.destroy();
//     return { message: 'User deleted successfully' };
//   } catch (error) {
//     console.error(`Error deleting user with ID ${id}:`, error);
//     throw error;
//   }
// }
// services/user.service.ts
import { EntityManager } from '@mikro-orm/core';
import { User } from '../../../entities/User.entity';

export async function getUserById(em: EntityManager, userID: number): Promise<User | null> {
  return await em.findOne(User, { userID });
}

export async function getAllUsers(em: EntityManager): Promise<User[]> {
  return await em.find(User, {});
}

export async function createUser(em: EntityManager, userData: Partial<User>): Promise<User> {
  const user = em.create(User, userData);
  await em.persistAndFlush(user);
  return user;
}

export async function updateUser(em: EntityManager, userID: number, userData: Partial<User>): Promise<User | null> {
  const user = await getUserById(em, userID);
  if (!user) return null;
  em.assign(user, userData);
  await em.persistAndFlush(user);
  return user;
}

export async function deleteUser(em: EntityManager, userID: number): Promise<boolean> {
  const user = await getUserById(em, userID);
  if (!user) return false;
  await em.removeAndFlush(user);
  return true;
}
