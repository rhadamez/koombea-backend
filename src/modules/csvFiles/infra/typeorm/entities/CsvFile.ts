import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { User } from '../../../../users/infra/typeorm/entities/User'

@Entity('files')
export default class CsvFile extends BaseEntity {
	@Column()
	file: string

	@Column()
	file_status: string

	@Column()
	user_id: number

	@ManyToOne(() => User, { eager: false })
	@JoinColumn({ name: 'user_id' })
	user: User
}
