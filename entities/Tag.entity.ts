import { Entity, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { TagExercises } from './TagExercise.entity'
@Entity({ tableName: 'tag'})
export class Tag {
  static entityName = 'tag';
  @PrimaryKey({type: "int", autoincrement: true})
  tag?: number;

  @Property({type: "string"})
  tagName!: string;

  @OneToMany(() => TagExercises, tagExercises => tagExercises.tag)
  tagExercises = new Collection<TagExercises>(this);
}
