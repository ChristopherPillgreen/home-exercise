import { EntityManager, RequiredEntityData } from "@mikro-orm/core";
import { User } from "@entities/User.entity";
import internal from "stream";

export const createUser = async (
  em: EntityManager,
  data: {
    userID: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPassword: string;
  }
): Promise<User> => {
  const user = em.create(User, data); 
  await em.persistAndFlush(user); 
  return user;
};


export const getUserById = async (
  em: EntityManager,
  userID: string
): Promise<User | null> => {
  return await em.findOne(User, { userID }, { populate: ["plans"] });
};

export const getAllUsers = async (em: EntityManager): Promise<User[]> => {
  console.log("User entity:", User);
  return await em.find(User, {}, { populate: ["plans"] });
};

export const updateUser = async (
  em: EntityManager,
  userID: string,
  data: Partial<User>
): Promise<User | null> => {
  const user = await getUserById(em, userID);
  if (!user) return null;
  em.assign(user, data);
  await em.persistAndFlush(user);
  return user;
};

export const deleteUser = async (
  em: EntityManager,
  userID: string
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
  const user = await em.findOne(User, { userEmail });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.userPassword !== userPassword) {
    throw new Error("Invalid password");
  }

  return user;
};
