// import { Exercise } from "./entities/Exercise.entity";
// import { MySqlDriver, defineConfig } from "@mikro-orm/mysql";
// import { MikroORM } from '@mikro-orm/core';
// import { FavoriteExercise } from "@entities/FavoriteExercise.entity";
// import { Plan } from "@entities/Plan.entity";
// import { PlanExercise } from "@entities/PlanExercise.entity";
// import { TagExercises } from "@entities/TagExercise.entity";
// import { Tag } from "@entities/Tag.entity";
// import { User } from "@entities/User.entity";



// export const orm = await MikroORM.init({
//     entities: [
//         Exercise,
//         FavoriteExercise,
//         Plan,
//         PlanExercise,
//         Tag,
//         TagExercises,
//         User
//     ],
//     entitiesTs: [
//         './entities/*.entity.ts',
//     ],
//     dbName: 'seniorproject',
//     host: 'localhost',
//     user: 'root',
//     driver: MySqlDriver, 
//     port: 3306,
//     password: 'root_password',
// })

import { entities } from '@entities/entities';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroORM } from '@mikro-orm/core';

let orm: MikroORM<MySqlDriver> | undefined;

export const getOrm = async () => {
  if (!orm) {
    orm = await MikroORM.init({
      entities,
      entitiesTs: ['./entities/*.entity.ts'], // TypeScript entity paths
      dbName: 'seniorproject',
      host: 'localhost',
      user: 'root',
      driver: MySqlDriver,
      port: 3306,
      password: 'root_password',
      allowGlobalContext: true,
    });
    console.log('mikro-orm initialized successfully');
  }
  return orm;
};
