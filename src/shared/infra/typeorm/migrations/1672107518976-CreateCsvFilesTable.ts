import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCsvFilesTable1672107518976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(new Table({
				name: 'files',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'file',
						type: 'varchar'
					},
					{
						name: 'file_status',
						type: 'varchar'
					},
					{
							name: 'user_id',
							type: 'integer'
					}
				]
			}))

			await queryRunner.createForeignKey('files', new TableForeignKey({
					name: 'FilesUserId',
					columnNames: ['user_id'],
					referencedTableName: 'users',
					referencedColumnNames: ['id'],
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
			}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('files', 'FilesUserId')
		await queryRunner.dropTable('files')
	}

}