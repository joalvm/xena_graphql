import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm-plus'
import EmployeeEntity from './EmployeeEntity'
import UserSessionEntity from './UserSessionEntity'

@Entity({ name: 'users' })
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined

  @Column('varchar', { nullable: false, length: 80 })
  username: string | undefined

  @Column('varchar', { nullable: false, length: 80 })
  password: string | undefined

  @Column('varchar', { nullable: false, length: 16 })
  salt: string | undefined

  @Column('bool', { nullable: false, default: false })
  is_admin: boolean | undefined

  @Column('varchar', { nullable: true, length: 160 })
  recovery_token?: string

  @Column('bool', { nullable: true, default: true })
  enabled?: boolean

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: new Date().toISOString(),
  })
  created_at?: string

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    onUpdate: new Date().toISOString(),
  })
  updated_at?: string

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deleted_at?: string

  @OneToOne(
    () => EmployeeEntity,
    (employee: EmployeeEntity) => employee.user
  )
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity | undefined

  @OneToMany(
    () => UserSessionEntity,
    (sessions: UserSessionEntity) => sessions.user
  )
  sessions: UserSessionEntity[] | undefined
}
