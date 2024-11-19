import { User } from '../../../models/User';


// Get all users from the database.
 
export async function getAllUsers() {
  try {
    return await User.findAll();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Could not fetch users');
  }
}


// Get a user by ID.

export async function getUserById(id: number) {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
}


// Create a new user.
 
export async function createUser(data: { userFirstName: string; userLastName: string; userEmail: string; userPassword: string }) {
  try {
    return await User.create(data);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Could not create user');
  }
}


// Update an existing user by ID.
 
export async function updateUser(id: number, data: any) {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(data);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
}


// Delete a user by ID.

export async function deleteUser(id: number) {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
}
