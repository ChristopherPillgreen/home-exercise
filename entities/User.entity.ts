import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Collection,
} from "@mikro-orm/core";

import { PlanExercise } from "./PlanExercise.entity";
import { FavoriteExercise } from "./FavoriteExercise.entity";
import FavoriteExercises from "app/favoriteexercises/page";
@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  userID?: number;

  @Property()
  userFirstName!: string;

  @Property()
  userLastName!: string;

  @Property({ unique: true })
  userEmail!: string;

  @Property()
  userPassword!: string;

  @OneToMany({ entity: () => "Plan", mappedBy: "user", lazy: true })
  plans = new Collection<Plan>(this);

  @OneToMany({ entity: () => "FavoriteExercise", mappedBy: "user" })
  favoriteExercise = new Collection<FavoriteExercise>(this);
}
import { Plan } from "./Plan.entity";
