import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { Plan } from './Plan.entity'
import { PlanExercise } from './PlanExercise.entity'
@Entity()
export class User {
  @PrimaryKey()
  userID!: number;

  @Property()
  userFirstName!: string;

  @Property()
  userLastName!: string;

  @Property({ unique: true })
  userEmail!: string;

  @Property()
  userPassword!: string;

//   @OneToMany(() => Plan, plan => plan.user)
//   plans = new Collection<Plan>(this);

//   @OneToMany(() => PlanExercise, planExercise => planExercise.exercise)
//   planExercise = new Collection<PlanExercise>(this);
}
