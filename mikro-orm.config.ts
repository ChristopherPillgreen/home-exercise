// import { Exercise } from "./entities/Exercise.entity";
// import { MySqlDriver, Options } from "@mikro-orm/mysql";
// import { MikroORM } from '@mikro-orm/core';
// import { FavoriteExercise } from "@entities/FavoriteExercise.entity";
// import { Plan } from "@entities/Plan.entity";
// import { PlanExercise } from "@entities/PlanExercise.entity";
// import { TagExercises } from "@entities/TagExercise.entity";
// import { Tag } from "@entities/Tag.entity";
// import { User } from "@entities/User.entity";

// const config: Options = {
//   entities: [
//     Exercise,
//     FavoriteExercise,
//     Plan,
//     PlanExercise,
//     Tag,
//     TagExercises,
//     User
//   ],
//   entitiesTs: [
//     './entities/*.entity.ts',
//   ],
//   dbName: 'seniorproject',
//   host: 'localhost',
//   user: 'root',
//   driver: MySqlDriver,
//   port: 3306,
//   password: 'root_password',
// }

// export const orm = MikroORM.init(config)

// export default config

import { Exercise } from '@entities/Exercise.entity';
import { FavoriteExercise } from '@entities/FavoriteExercise.entity';
import { Plan } from '@entities/Plan.entity';
import { PlanExercise } from '@entities/PlanExercise.entity';
import { Tag } from '@entities/Tag.entity';
import { TagExercises } from '@entities/TagExercise.entity';
import { User } from '@entities/User.entity';
import { MikroORM, Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';

const config: Options<MySqlDriver> = {
  // entities: ['./dist/entities/*.js'], // Compiled entities for production
  entities: [
    Exercise,
    FavoriteExercise,
    Plan,
    PlanExercise,
    Tag,
    TagExercises,
    User,
  ],
  entitiesTs: [
    Exercise,
    FavoriteExercise,
    Plan,
    PlanExercise,
    Tag,
    TagExercises,
    User,
  ], // Entity paths during development
  
  dbName: 'seniorproject',
  host: 'localhost',
  user: 'root',
  password: 'root_password',
  driver: MySqlDriver,
  port: 3306,
  debug: true,
};

let orm: MikroORM<MySqlDriver> | null = null;

export async function getOrm(): Promise<MikroORM<MySqlDriver>> {
  if (!orm) {
    orm = await MikroORM.init(config);
    console.log('MikroORM initialized!');
  }
  return orm;
}

export default config;
