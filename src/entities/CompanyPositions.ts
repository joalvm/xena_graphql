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
import { Companies } from './Companies'
import { Employees } from './Employees'

@Index('company_positions_pkey', ['id'], { unique: true })
@Entity('company_positions', { schema: 'public' })
export class CompanyPositions extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'name', nullable: true, length: 80 })
  name!: string | null

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

  @ManyToOne(() => Companies, companies => companies.companyPositions)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company!: Companies

  @OneToMany(() => Employees, employees => employees.companyPosition)
  employees!: Employees[]

  constructor(init?: Partial<CompanyPositions>) {
    super()
    Object.assign(this, init)
  }
}
