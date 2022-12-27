import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1672107228264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'username',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'password',
					type: 'varchar'
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users')
	}

}
