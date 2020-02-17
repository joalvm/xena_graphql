import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm-plus'
import { Employees } from './Employees'
import { Users } from './Users'

@Index('staff_division_pkey', ['id'], { unique: true })
@Entity('staff_division', { schema: 'public' })
export class StaffDivision extends BaseEntity {
  constructor(init?: Partial<StaffDivision>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character', { name: 'code', length: 4 })
  code!: string

  @Column('character varying', { name: 'name', length: 80 })
  name!: string

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date | null

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt!: Date | null

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt!: Date | null

  @OneToMany(
    () => Employees,
    employees => employees.staffDivision
  )
  employees!: Employees[]

  @ManyToOne(
    () => Users,
    users => users.staffDivisions
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user!: Users
}
