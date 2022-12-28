import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { User } from '../../../../users/infra/typeorm/entities/User'

@Entity('contacts')
export default class Contact extends BaseEntity {
	@Column()
	name: string

	@Column()
	date_of_birth: string

	@Column()
	phone: string

	@Column()
	address: string

	@Column()
	credit_card: string

	@Column()
	franchise: string

	@Column()
	email: string

	@Column({ nullable: true })
	user_id: number

	@ManyToOne(() => User, { eager: false })
	@JoinColumn({ name: 'user_id' })
	user: User
}
