import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm-plus'
import { Users } from './Users'

@Index('users_sessions_pkey', ['id'], { unique: true })
@Entity('users_sessions', { schema: 'public' })
export class UsersSessions extends BaseEntity {
  constructor(init?: Partial<UsersSessions>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'token', length: 180 })
  token!: string

  @Column('timestamp with time zone', { name: 'expire' })
  expire!: Date

  @Column('character varying', { name: 'ip', length: 15 })
  ip!: string

  @Column('character varying', { name: 'browser', nullable: true, length: 25 })
  browser!: string | null

  @Column('character varying', { name: 'version', nullable: true, length: 15 })
  version!: string | null

  @Column('character varying', { name: 'platform', nullable: true, length: 25 })
  platform!: string | null

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date | null

  @Column('timestamp with time zone', { name: 'closed_at', nullable: true })
  closedAt!: Date | null

  @ManyToOne(
    () => Users,
    users => users.usersSessions
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user!: Users
}
