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
import { Users } from './Users'

@Index('organizational_units_pkey', ['id'], { unique: true })
@Entity('organizational_units', { schema: 'public' })
export class OrganizationalUnits extends BaseEntity {
    constructor(init?: Partial<OrganizationalUnits>) {
        super()
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id!: number

    @Column('character varying', { name: 'name', length: 80 })
    name!: string

    @CreateDateColumn({
        type: 'timestamp with time zone',
        name: 'created_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date | null

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        name: 'updated_at', nullable: true
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
        employees => employees.organizationalUnit
    )
    employees!: Employees[]

    @ManyToOne(
        () => Users,
        users => users.organizationalUnits
    )
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user!: Users

    @RelationId((organizationalUnits: OrganizationalUnits) => organizationalUnits.user)
    @Column('int4', { name: 'user_id', nullable: false })
    userId!: number;
}
