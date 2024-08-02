import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const exercisesTable = sqliteTable("exercises", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageURL: text("image_url"),
});

// export const plansTable = sqliteTable("plans", {});

// export const favoritesTable = sqliteTable("favorites", {});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertExercise = typeof exercisesTable.$inferInsert;
export type SelectExercise = typeof exercisesTable.$inferSelect;
