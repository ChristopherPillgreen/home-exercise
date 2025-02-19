import { Migration } from '@mikro-orm/migrations';

export class Migration20250212194357 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`plan_exercise\` drop foreign key \`plan_exercise_plan_plan_id_foreign\`;`);

    this.addSql(`alter table \`user\` drop index \`user_user_email_unique\`;`);

    this.addSql(`alter table \`plan_exercise\` add \`description\` varchar(255) not null;`);
    this.addSql(`alter table \`plan_exercise\` add constraint \`plan_exercise_plan_plan_id_foreign\` foreign key (\`plan_plan_id\`) references \`plan\` (\`plan_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`favorite_exercise\` modify \`id\` int unsigned not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`plan_exercise\` drop foreign key \`plan_exercise_plan_plan_id_foreign\`;`);

    this.addSql(`alter table \`favorite_exercise\` modify \`id\` int unsigned not null;`);

    this.addSql(`alter table \`plan_exercise\` drop column \`description\`;`);

    this.addSql(`alter table \`plan_exercise\` add constraint \`plan_exercise_plan_plan_id_foreign\` foreign key (\`plan_plan_id\`) references \`plan\` (\`plan_id\`) on update cascade on delete no action;`);

    this.addSql(`alter table \`user\` add unique \`user_user_email_unique\`(\`user_email\`);`);
  }

}
