import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import type { Rel } from "@mikro-orm/core"
import { User } from './User.entity';
import { Exercise } from './Exercise.entity';

@Entity({ tableName: 'favorite_exercise'})
export class FavoriteExercise {
  static entityName = 'favorite_exercise';
  @PrimaryKey({ type: "int", autoincrement: true })
  id!: number

  @ManyToOne(() => User, { primary: true, lazy: true })
  user!: Rel<User>;

  @ManyToOne(() => Exercise, { primary: true, lazy: true })
  exercise!: Rel<Exercise>;
}

