import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm-plus'
import { Persons } from './Persons'

@Index('document_types_pkey', ['id'], { unique: true })
@Entity('document_types', { schema: 'public' })
export class DocumentTypes extends BaseEntity {
  constructor(init?: Partial<DocumentTypes>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'name', length: 35 })
  name!: string

  @Column('character varying', { name: 'abbr', length: 10 })
  abbr!: string

  @Column('numeric', { name: 'length', precision: 3, scale: 0 })
  length!: string

  @Column('boolean', { name: 'exact_length', default: () => 'true' })
  exactLength!: boolean

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
    () => Persons,
    persons => persons.documentType
  )
  persons!: Persons[]
}
