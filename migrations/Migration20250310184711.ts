import { Migration } from '@mikro-orm/migrations';

export class Migration20250310184711 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`favorite_exercise\` modify \`id\` int unsigned not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`favorite_exercise\` modify \`id\` int unsigned not null;`);
  }

}
