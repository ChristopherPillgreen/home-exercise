import { Exercise } from '@entities/Exercise.entity';
import { FavoriteExercise } from '@entities/FavoriteExercise.entity';
import { Plan } from '@entities/Plan.entity';
import { PlanExercise } from '@entities/PlanExercise.entity';
import { Tag } from '@entities/Tag.entity';
import { TagExercises } from '@entities/TagExercise.entity';
import { User } from '@entities/User.entity';
import { MikroORM, Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import dotenv from 'dotenv';
dotenv.config();

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
  
  // dbName: 'seniorproject',
  // host: '127.0.0.1',
  // user: 'root',
  // password: 'root_password',
  // driver: MySqlDriver,
  // port: 3306,
  // debug: true,
  dbName: process.env.MYSQL_DATABASE || 'seniorproject',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root_password',
  driver: MySqlDriver,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
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
