import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm-plus'
import { Companies } from './Companies'
import { Users } from './Users'

@Index('users_collaborators_pkey', ['id'], { unique: true })
@Entity('users_collaborators', { schema: 'public' })
export class UsersCollaborators extends BaseEntity {
  constructor(init?: Partial<UsersCollaborators>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date | null

  @ManyToOne(
    () => Companies,
    companies => companies.usersCollaborators
  )
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company!: Companies

  @ManyToOne(
    () => Users,
    users => users.usersCollaborators
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user!: Users
}
