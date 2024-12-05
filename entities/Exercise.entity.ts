// import { Entity, OneToMany, PrimaryKey, Property, Collection } from "@mikro-orm/core";
// import { TagExercises } from './TagExercise.entity';
// import { FavoriteExercise } from './FavoriteExercise.entity';
// import { PlanExercise } from './PlanExercise.entity';


// console.log('exercise');
// @Entity()
// export class Exercise {


//     @PrimaryKey()
//     exerciseID?: number;

//     @Property()
//     exerciseName!: string;

//     @Property()
//     exerciseDescription!: string;

//     @OneToMany(() => 'FavoriteExercise', favoriteExercise => favoriteExercise.exercise, {lazy: true})
//     favoriteExercises = new Collection<FavoriteExercise>(this);

//     // @OneToMany(() => TagExercises, (tagExercises) => tagExercises.exercise, {lazy: true})
//     // tagExercise = new Collection<TagExercises>(this);

//     @OneToMany(() => 'PlanExercise', (planExercise) => planExercise.exercise, {lazy: true})
//     planExercises = new Collection<PlanExercise>(this);

//     @OneToMany({ entity: () => 'TagExercises', mappedBy: 'exercise'})
//     tagExercise = new Collection<TagExercises>(this);
//  }

import { Entity, OneToMany, PrimaryKey, Property, Collection } from "@mikro-orm/core";
import { TagExercises } from './TagExercise.entity';
import { FavoriteExercise } from './FavoriteExercise.entity';
import { PlanExercise } from './PlanExercise.entity';

console.log('exercise');

@Entity()
export class Exercise {

    @PrimaryKey({autoincrement: true})
    exerciseID?: number;

    @Property()
    exerciseName!: string;

    @Property()
    exerciseDescription!: string;

    @Property()
    image!: string;

    @OneToMany({ entity: () => 'FavoriteExercise', mappedBy: 'exercise', lazy: true })
    favoriteExercises = new Collection<FavoriteExercise>(this);

    @OneToMany({ entity: () => 'PlanExercise', mappedBy: 'exercise', lazy: true })
    planExercises = new Collection<PlanExercise>(this);

    @OneToMany({ entity: () => 'TagExercises', mappedBy: 'exercise', lazy: true })
    tagExercise = new Collection<TagExercises>(this);
}

