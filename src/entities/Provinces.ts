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
import { Districts } from './Districts'
import { Departments } from './Departments'

@Index('provinces_pkey', ['id'], { unique: true })
@Entity('provinces', { schema: 'public' })
export class Provinces extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'name', length: 80 })
  name: string

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null

  @OneToMany(
    () => Districts,
    districts => districts.province
  )
  districts: Districts[]

  @ManyToOne(
    () => Departments,
    departments => departments.provinces
  )
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'id' }])
  department: Departments

  constructor(init?: Partial<Provinces>) {
    super()
    Object.assign(this, init)
  }
}
