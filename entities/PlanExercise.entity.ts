import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Plan } from './Plan.entity';
import { Exercise } from './Exercise.entity';

@Entity()
export class PlanExercise {
  @ManyToOne(() => Plan, { primary: true, lazy: true })
  plan!: Plan;

  @ManyToOne(() => Exercise, { primary: true, lazy: true })
  exercise!: Exercise;

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
}
