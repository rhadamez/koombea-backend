import { Column, Entity, OneToMany } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Contact from '../../../../contacts/infra/typeorm/entities/Contact'

@Entity('users')
export class User extends BaseEntity {
	@Column()
	username: string

	@Column()
	password: string

	@OneToMany(() => Contact, contact => contact.user)
	projectHistorics: Contact[]

  //{ eager: false }
}
