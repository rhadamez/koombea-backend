import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateContactsTable1672107506134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
			name: 'contacts',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'date_of_birth',
					type: 'varchar'
				},
				{
					name: 'phone',
					type: 'varchar'
				},
				{
					name: 'address',
					type: 'varchar'
				},
				{
					name: 'credit_card',
					type: 'varchar'
				},
				{
					name: 'franchise',
					type: 'varchar'
				},
				{
					name: 'email',
					type: 'varchar'
				},
				{
					name: 'user_id',
					type: 'integer'
				}
			]
		}))

        await queryRunner.createForeignKey('contacts', new TableForeignKey({
            name: 'ContactUserId',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('contacts', 'ContactUserId')
		await queryRunner.dropTable('contacts')
	}

}