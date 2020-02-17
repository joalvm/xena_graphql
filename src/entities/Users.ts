import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm-plus'
import { Companies } from './Companies'
import { CostCenters } from './CostCenters'
import { OrganizationalUnits } from './OrganizationalUnits'
import { Persons } from './Persons'
import { StaffArea } from './StaffArea'
import { StaffDivision } from './StaffDivision'
import { UsersCollaborators } from './UsersCollaborators'
import { UsersSessions } from './UsersSessions'
import { Genders } from '../enums/Genders'

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  constructor(init?: Partial<Users>) {
    super()
    Object.assign(this, init)
  }

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'username', length: 80 })
  username!: string

  @Column('character varying', { name: 'password', length: 80 })
  password!: string

  @Column('character', { name: 'salt', length: 16 })
  salt!: string

  @Column('boolean', { name: 'is_admin', default: () => 'false' })
  isAdmin!: boolean

  @Column('character varying', {
    name: 'recovery_token',
    nullable: true,
    length: 160,
  })
  recoveryToken!: string | null

  @Column('boolean', { name: 'enabled', nullable: true, default: () => 'true' })
  enabled!: boolean | null

  @Column('character varying', { name: 'name', length: 50 })
  name!: string

  @Column('character varying', { name: 'lastname', length: 50 })
  lastname!: string

  @Column('enum', { name: 'gender', enum: Genders })
  gender!: keyof typeof Genders

  @Column('character varying', { name: 'email', length: 80 })
  email!: string

  @Column('character varying', {
    name: 'avatar_url',
    nullable: true,
    length: 80,
  })
  avatarUrl!: string | null

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
    () => Companies,
    companies => companies.user
  )
  companies!: Companies[]

  @OneToMany(
    () => CostCenters,
    costCenters => costCenters.user
  )
  costCenters!: CostCenters[]

  @OneToMany(
    () => OrganizationalUnits,
    organizationalUnits => organizationalUnits.user
  )
  organizationalUnits!: OrganizationalUnits[]

  @OneToMany(
    () => Persons,
    persons => persons.user
  )
  persons!: Persons[]

  @OneToMany(
    () => StaffArea,
    staffArea => staffArea.user
  )
  staffAreas!: StaffArea[]

  @OneToMany(
    () => StaffDivision,
    staffDivision => staffDivision.user
  )
  staffDivisions!: StaffDivision[]

  @OneToMany(
    () => UsersCollaborators,
    usersCollaborators => usersCollaborators.user
  )
  usersCollaborators!: UsersCollaborators[]

  @OneToMany(
    () => UsersSessions,
    usersSessions => usersSessions.user
  )
  usersSessions!: UsersSessions[]
}
