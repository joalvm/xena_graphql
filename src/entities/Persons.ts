import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
} from 'typeorm-plus'
import { Employees } from './Employees'
import { Districts } from './Districts'
import { DocumentTypes } from './DocumentTypes'
import { Users } from './Users'
import { MaritalStatus, Genders } from '../enums'

@Index('persons_pkey', ['id'], { unique: true })
@Entity('persons', { schema: 'public' })
export class Persons extends BaseEntity {
  constructor(init?: Partial<Persons>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('int4', { name: 'user_id' })
  userId!: number

  @Column('character varying', { name: 'name', length: 80 })
  name!: string

  @Column('character varying', { name: 'lastname', length: 80 })
  lastname!: string

  @Column('enum', { name: 'gender', enum: Genders })
  gender!: keyof typeof Genders

  @Column('enum', {
    name: 'marital_status',
    enum: MaritalStatus,
  })
  maritalStatus!: keyof typeof MaritalStatus

  @Column('character varying', { name: 'document_number', length: 20 })
  documentNumber!: string

  @Column('date', { name: 'date_of_birth' })
  dateOfBirth!: string

  @Column('text', { name: 'direction', nullable: true })
  direction!: string | null

  @Column('character varying', { name: 'phone', nullable: true, length: 12 })
  phone!: string | null

  @Column('character varying', { name: 'mobile', nullable: true, length: 12 })
  mobile!: string | null

  @Column('character varying', { name: 'email', nullable: true, length: 80 })
  email!: string | null

  @Column('character varying', { name: 'avatar_url', nullable: true, length: 150 })
  avatarUrl!: string | null

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date | null

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
    nullable: true
  })
  updatedAt!: Date | null

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable: true
  })
  deletedAt!: Date | null

  @OneToMany(
    () => Employees,
    employees => employees.person2
  )
  employees!: Employees[]

  @ManyToOne(
    () => Districts,
    districts => districts.persons
  )
  @JoinColumn([{ name: 'district_id', referencedColumnName: 'id' }])
  district!: Districts

  @ManyToOne(
    () => DocumentTypes,
    documentTypes => documentTypes.persons
  )
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType!: DocumentTypes

  @ManyToOne(
    () => Users,
    users => users.persons
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user!: Users

  @RelationId((person: Persons) => person.documentType)
  documentTypeId!: number;
}
