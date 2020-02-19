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
import { Provinces } from './Provinces'
import { Persons } from './Persons'

@Index('districts_pkey', ['id'], { unique: true })
@Entity('districts', { schema: 'public' })
export class Districts extends BaseEntity {
  constructor(init?: Partial<Districts>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'name', length: 80 })
  name!: string

  @Column('character', { name: 'code', length: 6 })
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

  @ManyToOne(() => Provinces, provinces => provinces.districts)
  @JoinColumn([{ name: 'province_id', referencedColumnName: 'id' }])
  province!: Provinces

  @OneToMany(() => Persons, persons => persons.district)
  persons!: Persons[]
}
