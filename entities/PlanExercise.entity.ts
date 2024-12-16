import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { Exercise } from "./Exercise.entity";

import { Plan } from "./Plan.entity";

@Entity()
export class PlanExercise {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  sequenceNum!: number;

  @Property()
  reps!: number;

  @Property()
  sets!: number;

  @Property()
  duration!: number;

  @Property()
  time!: number;

  @ManyToOne(() => Plan, { eager: true })
  plan!: Plan;

  @ManyToOne(() => Exercise, { eager: true })
  exercise!: Exercise;
}
