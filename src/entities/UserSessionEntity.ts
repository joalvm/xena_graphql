import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm-plus'
import UserEntity from './UserEntity'

@Entity({ name: 'users_sessions' })
export default class UserSessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined

  @Column('varchar', {nullable: false, length: 180})
  token: string | undefined

  @Column('timestamptz', {nullable: false})
  expire: string | undefined

  @Column('varchar', {nullable: false, length: 15})
  ip: string | undefined

  @Column('varchar', {nullable: true, length: 25})
  browser: string | undefined

  @Column('varchar', {nullable: true, length: 15})
  version: string | undefined

  @Column('varchar', {nullable: true, length: 25})
  platform: string | undefined

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at?: string

  @Column('timestamptz', { nullable: true })
  closed_at?: string

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.sessions
  )
  @JoinColumn({name: 'user_id'})
  user?: UserEntity
}
