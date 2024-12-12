import { Exercise } from "./entities/Exercise.entity";
import { MySqlDriver, Options } from "@mikro-orm/mysql";
import { MikroORM } from '@mikro-orm/core';
import { FavoriteExercise } from "@entities/FavoriteExercise.entity";
import { Plan } from "@entities/Plan.entity";
import { PlanExercise } from "@entities/PlanExercise.entity";
import { TagExercises } from "@entities/TagExercise.entity";
import { Tag } from "@entities/Tag.entity";
import { User } from "@entities/User.entity";

const config: Options = {
  entities: [
    Exercise,
    FavoriteExercise,
    Plan,
    PlanExercise,
    Tag,
    TagExercises,
    User
  ],
  entitiesTs: [
    './entities/*.entity.ts',
  ],
  dbName: 'seniorproject',
  host: 'localhost',
  user: 'root',
  driver: MySqlDriver,
  port: 3306,
  password: 'root_password',
}

export const orm = MikroORM.init(config)

export default config
