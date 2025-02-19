import { Migration } from '@mikro-orm/migrations';

export class Migration20250217200912 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`plan\` add \`plan_name\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`plan\` drop column \`plan_name\`;`);
  }

}
