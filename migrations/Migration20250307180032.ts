import { Migration } from '@mikro-orm/migrations';

export class Migration20250307180032 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`exercise\` (\`exercise_id\` int unsigned not null auto_increment primary key, \`exercise_name\` varchar(255) not null, \`exercise_description\` varchar(255) not null, \`image\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`tag\` (\`tag\` int unsigned not null auto_increment primary key, \`tag_name\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`tag_exercises\` (\`exercise_exercise_id\` int unsigned not null, \`tag_tag\` int unsigned not null, primary key (\`exercise_exercise_id\`, \`tag_tag\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tag_exercises\` add index \`tag_exercises_exercise_exercise_id_index\`(\`exercise_exercise_id\`);`);
    this.addSql(`alter table \`tag_exercises\` add index \`tag_exercises_tag_tag_index\`(\`tag_tag\`);`);

    this.addSql(`create table \`user\` (\`user_id\` varchar(255) not null, \`user_first_name\` varchar(255) not null, \`user_last_name\` varchar(255) not null, \`user_email\` varchar(255) not null, \`user_password\` varchar(255) null, primary key (\`user_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user\` add unique \`user_user_email_unique\`(\`user_email\`);`);

    this.addSql(`create table \`plan\` (\`plan_id\` int unsigned not null auto_increment primary key, \`frequency\` int null, \`favorites\` tinyint(1) null, \`plan_name\` varchar(255) null, \`user_user_id\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`plan\` add index \`plan_user_user_id_index\`(\`user_user_id\`);`);

    this.addSql(`create table \`plan_exercise\` (\`id\` int unsigned not null auto_increment primary key, \`sequence_num\` int null, \`reps\` int null, \`sets\` int null, \`duration\` int null, \`time\` int null, \`description\` varchar(255) null, \`plan_plan_id\` int unsigned not null, \`exercise_exercise_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`plan_exercise\` add index \`plan_exercise_plan_plan_id_index\`(\`plan_plan_id\`);`);
    this.addSql(`alter table \`plan_exercise\` add index \`plan_exercise_exercise_exercise_id_index\`(\`exercise_exercise_id\`);`);

    this.addSql(`create table \`favorite_exercise\` (\`id\` int unsigned not null, \`user_user_id\` varchar(255) not null, \`exercise_exercise_id\` int unsigned not null, primary key (\`id\`, \`user_user_id\`, \`exercise_exercise_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`favorite_exercise\` add index \`favorite_exercise_user_user_id_index\`(\`user_user_id\`);`);
    this.addSql(`alter table \`favorite_exercise\` add index \`favorite_exercise_exercise_exercise_id_index\`(\`exercise_exercise_id\`);`);

    this.addSql(`alter table \`tag_exercises\` add constraint \`tag_exercises_exercise_exercise_id_foreign\` foreign key (\`exercise_exercise_id\`) references \`exercise\` (\`exercise_id\`) on update cascade;`);
    this.addSql(`alter table \`tag_exercises\` add constraint \`tag_exercises_tag_tag_foreign\` foreign key (\`tag_tag\`) references \`tag\` (\`tag\`) on update cascade;`);

    this.addSql(`alter table \`plan\` add constraint \`plan_user_user_id_foreign\` foreign key (\`user_user_id\`) references \`user\` (\`user_id\`) on update cascade;`);

    this.addSql(`alter table \`plan_exercise\` add constraint \`plan_exercise_plan_plan_id_foreign\` foreign key (\`plan_plan_id\`) references \`plan\` (\`plan_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`plan_exercise\` add constraint \`plan_exercise_exercise_exercise_id_foreign\` foreign key (\`exercise_exercise_id\`) references \`exercise\` (\`exercise_id\`) on update cascade;`);

    this.addSql(`alter table \`favorite_exercise\` add constraint \`favorite_exercise_user_user_id_foreign\` foreign key (\`user_user_id\`) references \`user\` (\`user_id\`) on update cascade;`);
    this.addSql(`alter table \`favorite_exercise\` add constraint \`favorite_exercise_exercise_exercise_id_foreign\` foreign key (\`exercise_exercise_id\`) references \`exercise\` (\`exercise_id\`) on update cascade;`);
  }

}
