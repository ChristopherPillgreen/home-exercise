import { EntityManager } from "@mikro-orm/core";
import { User } from "@entities/User.entity"; 

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
