import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm-plus'
import CompanyEntity from './CompanyEntity'
import UserEntity from './UserEntity'

export enum Gender {
  FEMELE = 'f',
  MALE = 'm',
}

@Entity({ name: 'employees' })
export default class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined

  @Column('varchar', { nullable: false, length: 80 })
  name: string | undefined

  @Column('varchar', { nullable: false, length: 80 })
  lastname: string | undefined

  @Column('enum', { name: 'gender', enum: Gender })
  gender: Gender | undefined

  @Column('varchar', { nullable: false, length: 80 })
  email?: string

  @Column('timestamptz', { nullable: true, default: new Date().toUTCString() })
  created_at?: string

  @Column('timestamptz', { nullable: true })
  updated_at?: string

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deleted_at?: string

  @OneToOne(
    () => CompanyEntity,
    (company: CompanyEntity) => company.employees
  )
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity | undefined

  @OneToOne(
    () => UserEntity,
    (user: UserEntity) => user.employee
  )
  user: UserEntity | undefined
}
