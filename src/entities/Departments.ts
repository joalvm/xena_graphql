import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm-plus'
import { Provinces } from './Provinces'

@Index('departments_pkey', ['id'], { unique: true })
@Entity('departments', { schema: 'public' })
export class Departments extends BaseEntity {
  constructor(init?: Partial<Departments>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'name', length: 80 })
  name!: string

  @Column('char', { name: 'code', length: 2 })
  code!: string

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

  @OneToMany(() => Provinces, provinces => provinces.department)
  provinces!: Provinces[]
}
