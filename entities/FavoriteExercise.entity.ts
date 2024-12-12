import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from './User.entity';
import { Exercise } from './Exercise.entity';

@Entity()
export class FavoriteExercise {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @ManyToOne(() => User, { primary: true, lazy: true })
  user!: User;

  @ManyToOne(() => Exercise, { primary: true, lazy: true })
  exercise!: Exercise;
}
