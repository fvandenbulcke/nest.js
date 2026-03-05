import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSuperHeroesTable1709639400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'super_heroes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Créer la table des pouvoirs
    await queryRunner.createTable(
      new Table({
        name: 'super_hero_power',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
      true,
    );

    // Créer la table de liaison many-to-many
    await queryRunner.createTable(
      new Table({
        name: 'super_hero_powers_relation',
        columns: [
          {
            name: 'super_hero_id',
            type: 'uuid',
          },
          {
            name: 'power_id',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    // Ajouter la clé primaire composite
    await queryRunner.query(
      `ALTER TABLE "super_hero_powers_relation" ADD PRIMARY KEY ("super_hero_id", "power_id")`,
    );

    // Ajouter les clés étrangères
    await queryRunner.createForeignKey(
      'super_hero_powers_relation',
      new TableForeignKey({
        columnNames: ['super_hero_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'super_heroes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'super_hero_powers_relation',
      new TableForeignKey({
        columnNames: ['power_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'super_hero_power',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('super_hero_powers_relation');
    await queryRunner.dropTable('super_heroes');
    await queryRunner.dropTable('super_hero_power');
  }
}
