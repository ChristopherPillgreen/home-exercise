import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { Exercise } from "./Exercise.entity";
import type { Rel } from "@mikro-orm/core"
import { Plan } from "./Plan.entity";

@Entity({ tableName: 'plan_exercise'})
export class PlanExercise {

  static entityName = 'plan_exercise';
  @PrimaryKey({ type: "int", autoincrement: true })
  id!: number;

  @Property({type: "int", nullable: true })
  sequenceNum?: number;

  @Property({type: "int", nullable: true})
  reps?: number;

  @Property({type: "int", nullable: true})
  sets?: number;

  @Property({type: "int", nullable: true})
  duration?: number;

  @Property({type: "int", nullable: true})
  time?: number;

  @Property({type: "string", nullable: true})
  description?: string;

  @ManyToOne({ entity: () => Plan, deleteRule: "cascade" })
  plan!: Rel<Plan>;

  @ManyToOne({ entity: () => Exercise, eager: true })
  exercise!: Rel<Exercise>;
}

