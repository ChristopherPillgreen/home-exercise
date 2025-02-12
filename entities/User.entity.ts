// import {
//   Entity,
//   OneToMany,
//   PrimaryKey,
//   Property,
//   Collection,
// } from "@mikro-orm/core";

// import { FavoriteExercise } from "./FavoriteExercise.entity";
// @Entity()
// export class User {
//   @PrimaryKey({ autoincrement: true })
//   userID?: number;

//   @Property()
//   userFirstName!: string;

//   @Property()
//   userLastName!: string;

//   @Property({ unique: true })
//   userEmail!: string;

//   @Property()
//   userPassword!: string;

//   @OneToMany({ entity: () => "Plan", mappedBy: "user", lazy: true })
//   plans = new Collection<Plan>(this);

//   @OneToMany({ entity: () => "FavoriteExercise", mappedBy: "user" })
//   favoriteExercise = new Collection<FavoriteExercise>(this);
// }
// import { Plan } from "./Plan.entity";

import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Collection,
} from "@mikro-orm/core";
import { FavoriteExercise } from "./FavoriteExercise.entity";
import { Plan } from "./Plan.entity"; // Ensure this import is correct

@Entity({ tableName: 'user'})
export class User {

  static entityName = 'user';
  @PrimaryKey({ type: "int", autoincrement: true })
  userID?: number;

  @Property({type: "string"})
  userFirstName!: string;

  @Property({type: "string"})
  userLastName!: string;

  @Property({type: "string"})
  userEmail!: string;
  

  @Property({type: "string"})
  userPassword!: string;

  @OneToMany(() => Plan, (plan) => plan.user)
  plans = new Collection<Plan>(this);

  @OneToMany(() => FavoriteExercise, (favoriteExercise) => favoriteExercise.user)
  favoriteExercise = new Collection<FavoriteExercise>(this);
}  


