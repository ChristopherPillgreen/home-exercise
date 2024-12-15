import { EntityManager } from "@mikro-orm/core";
import { User } from "@entities/User.entity"; // Adjust the import path if needed

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
