import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Exercise } from './Exercise.entity';
import { Tag } from './Tag.entity';

@Entity()
export class TagExercises {
    @ManyToOne({ entity: 'Exercise', primary: true, lazy: true })
    exercise!: Exercise;
    
    @ManyToOne({ entity: 'Tag', primary: true, lazy: true })
    tag!: Tag;
    
}

