// import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
// import { User } from './User.entity'; // Adjust the path as needed
// import { PlanExercise } from './PlanExercise.entity'
// @Entity()
// export class Plan {
//   @PrimaryKey({ autoincrement: true})
//   planID!: number;

//   @Property()
//   frequency!: number;

//   @Property({ type: 'boolean' })
//   favorites!: boolean;

//   @ManyToOne(() => User, { nullable: false })
//   user!: User;

//   @OneToMany({ entity: () => "PlanExercise", mappedBy: 'plan', eager: true })
//   planExercises = new Collection<PlanExercise>(this);

// }
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './User.entity'; 
import { PlanExercise } from './PlanExercise.entity';
import type { Rel } from "@mikro-orm/core"

@Entity({ tableName: 'plan'})
export class Plan {
  static entityName = 'plan';
  @PrimaryKey({ type: "int", autoincrement: true })
  planID!: number;

  @Property({ type: "int" })
  frequency!: number;

  @Property({ type: 'boolean' })
  favorites!: boolean;

  @Property({ type: 'string' })
  planName!: string;

  @ManyToOne(() => User, { nullable: false })
  user?: Rel<User>;

  @OneToMany(() => PlanExercise, (planExercise) => planExercise.plan, { eager: true })
  planExercises = new Collection<PlanExercise>(this);
}

