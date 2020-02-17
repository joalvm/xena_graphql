import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm-plus'
import { Employees } from './Employees'
import { FishingVessels } from './FishingVessels'

@Index('fishing_company_parameters_pkey', ['id'], { unique: true })
@Entity('fishing_company_parameters', { schema: 'public' })
export class FishingCompanyParameters extends BaseEntity {
  constructor(init?: Partial<FishingCompanyParameters>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('numeric', {
    name: 'fishing_part',
    nullable: true,
    precision: 3,
    scale: 0,
  })
  fishingPart!: string | null

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date | null

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt!: Date | null

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
  deletedAt!: Date | null

  @ManyToOne(
    () => Employees,
    employees => employees.fishingCompanyParameters
  )
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
  employee!: Employees

  @ManyToOne(
    () => FishingVessels,
    fishingVessels => fishingVessels.fishingCompanyParameters
  )
  @JoinColumn([{ name: 'fishing_vessel_id', referencedColumnName: 'id' }])
  fishingVessel!: FishingVessels
}
