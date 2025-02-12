
import { Entity, OneToMany, PrimaryKey, Property, Collection } from "@mikro-orm/core";
import { TagExercises } from './TagExercise.entity';
import { FavoriteExercise } from './FavoriteExercise.entity';
import { PlanExercise } from './PlanExercise.entity';


@Entity({ tableName: 'exercise'})
export class Exercise {

    static entityName = 'exercise';
    @PrimaryKey({type: "int", autoincrement: true})
    exerciseID?: number;

    @Property({type: "string"})
    exerciseName!: string;

    @Property({type: "string"})
    exerciseDescription!: string;

    @Property({type: "string"})
    image!: string;

    @OneToMany({ entity: () => FavoriteExercise, mappedBy: 'exercise', lazy: true })
    favoriteExercises = new Collection<FavoriteExercise>(this);

    @OneToMany({ entity: () => PlanExercise, mappedBy: 'exercise', lazy: true })
    planExercises = new Collection<PlanExercise>(this);

    @OneToMany({ entity: () => TagExercises, mappedBy: 'exercise', lazy: true })
    tagExercise = new Collection<TagExercises>(this);
}

