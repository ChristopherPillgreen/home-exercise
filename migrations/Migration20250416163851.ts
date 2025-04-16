import { Migration } from '@mikro-orm/migrations';

export class Migration20250416163851 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`plan\` add \`plan_description\` varchar(255) null;`);

    this.addSql(`alter table \`plan_exercise\` modify \`duration\` varchar(255), modify \`time\` varchar(255);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`plan\` drop column \`plan_description\`;`);

    this.addSql(`alter table \`plan_exercise\` modify \`duration\` int, modify \`time\` int;`);
  }

}
