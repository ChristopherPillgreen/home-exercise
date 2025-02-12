// import { MikroORM } from "@mikro-orm/mysql";
// import 'reflect-metadata';
// import { MetadataStorage } from '@mikro-orm/core';


// const orm = await MikroORM.init()

// console.log(MetadataStorage.getMetadata());

import { MikroORM } from "@mikro-orm/mysql";
import config from "./mikro-orm.config"; // Ensure this points to your ORM configuration file
import { MySqlMikroORM } from "node_modules/@mikro-orm/mysql/MySqlMikroORM";

let orm: MikroORM | undefined;

export async function getOrm(): Promise<MikroORM> {
  if (!orm) {
    orm = await MikroORM.init(config) as MySqlMikroORM;
    const allMeta = orm.getMetadata().getAll();
    console.log(allMeta);
    console.log("MikroORM initialized!");
  }
  return orm;
}
