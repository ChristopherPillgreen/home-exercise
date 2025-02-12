import { Entity, ManyToOne } from '@mikro-orm/core';
import { Exercise } from './Exercise.entity';
import { Tag } from './Tag.entity';
import type { Rel } from "@mikro-orm/core"

@Entity({ tableName: 'tag_exercises'})
export class TagExercises {

    static entityName = 'tag_exercises';
    @ManyToOne(() => Exercise, { primary: true, lazy: true })
    exercise!: Rel<Exercise>;

    @ManyToOne(() => Tag, { primary: true, lazy: true })
    tag!: Rel<Tag>;

}

