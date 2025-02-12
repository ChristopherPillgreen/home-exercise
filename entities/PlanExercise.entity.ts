import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { Exercise } from "./Exercise.entity";
import type { Rel } from "@mikro-orm/core"
import { Plan } from "./Plan.entity";

@Entity({ tableName: 'plan_exercise'})
export class PlanExercise {

  static entityName = 'plan_exercise';
  @PrimaryKey({ type: "int", autoincrement: true })
  id!: number;

  @Property({type: "int" })
  sequenceNum!: number;

  @Property({type: "int"})
  reps!: number;

  @Property({type: "int"})
  sets!: number;

  @Property({type: "int"})
  duration!: number;

  @Property({type: "int"})
  time!: number;

  @Property({type: "string"})
  description?: string;

  @ManyToOne({ entity: () => Plan, deleteRule: "cascade" })
  plan!: Rel<Plan>;

  @ManyToOne({ entity: () => Exercise, eager: true })
  exercise!: Rel<Exercise>;
}

