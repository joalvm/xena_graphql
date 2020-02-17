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
import { FishingCompanyParameters } from './FishingCompanyParameters'
import { Companies } from './Companies'

@Index('fishing_vessels_pkey', ['id'], { unique: true })
@Entity('fishing_vessels', { schema: 'public' })
export class FishingVessels extends BaseEntity {
  constructor(init?: Partial<FishingVessels>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'name', length: 25 })
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
    () => FishingCompanyParameters,
    fishingCompanyParameters => fishingCompanyParameters.fishingVessel
  )
  fishingCompanyParameters!: FishingCompanyParameters[]

  @ManyToOne(
    () => Companies,
    companies => companies.fishingVessels
  )
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company!: Companies
}
