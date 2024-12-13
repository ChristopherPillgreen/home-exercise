import { EntityManager, RequiredEntityData } from "@mikro-orm/core";
import { User } from "@entities/User.entity";

export const createUser = async (
  em: EntityManager,
  data: {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPassword: string;
  }
): Promise<User> => {
  const user = em.create(User, data); // Create a new user entity
  await em.persistAndFlush(user); // Persist and flush the entity to the database
  return user;
};

// Get a User by ID
export const getUserById = async (
  em: EntityManager,
  userID: number
): Promise<User | null> => {
  return await em.findOne(User, { userID }, { populate: ["plans"] });
};

// Get All Users
export const getAllUsers = async (em: EntityManager): Promise<User[]> => {
  console.log("User entity:", User);
  return await em.find(User, {}, { populate: ["plans"] });
};

// Update a User
export const updateUser = async (
  em: EntityManager,
  userID: number,
  data: Partial<User>
): Promise<User | null> => {
  const user = await getUserById(em, userID);
  if (!user) return null;
  em.assign(user, data);
  await em.persistAndFlush(user);
  return user;
};

// Delete a User
export const deleteUser = async (
  em: EntityManager,
  userID: number
): Promise<boolean> => {
  const user = await getUserById(em, userID);
  if (!user) return false;
  await em.removeAndFlush(user);
  return true;
};

export const loginUser = async (
  em: EntityManager,
  userEmail: string,
  userPassword: string
): Promise<User | null> => {
  // Find user by email
  const user = await em.findOne(User, { userEmail });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the entered password matches the stored password
  if (user.userPassword !== userPassword) {
    throw new Error("Invalid password");
  }

  return user;
};
