import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { TagExercises } from './TagExercise.entity'
@Entity()
export class Tag {
  @PrimaryKey()
  tag!: string;

  @Property()
  tagName!: string;

  @OneToMany(() => TagExercises, tagExercises => tagExercises.tag)
  tagExercises = new Collection<TagExercises>(this);
}
