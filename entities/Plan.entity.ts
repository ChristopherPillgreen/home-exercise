import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './User.entity'; // Adjust the path as needed
import { PlanExercise } from './PlanExercise.entity'
@Entity()
export class Plan {
  @PrimaryKey({ autoincrement: true})
  planID?: number;

  @Property()
  frequency!: number;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Property({ type: 'boolean' })
  favorites!: boolean;

  @OneToMany(() => PlanExercise, planExercise => planExercise.plan)
  planExercises = new Collection<PlanExercise>(this);

}
