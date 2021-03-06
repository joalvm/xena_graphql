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
import { Users } from './Users'
import { Employees } from './Employees'

@Index('cost_centers_pkey', ['id'], { unique: true })
@Entity('cost_centers', { schema: 'public' })
export class CostCenters extends BaseEntity {
    constructor(init?: Partial<CostCenters>) {
        super()
        Object.assign(this, init)
    }

    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id!: number

    @Column('character', { name: 'code', length: 10 })
    code!: string

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

    @OneToMany(() => Employees, employees => employees.costCenter)
    employees!: Employees[]

    @ManyToOne(() => Users, users => users.costCenters)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user!: Users

    @RelationId((costCenters: CostCenters) => costCenters.user)
    @Column('int4', { name: 'user_id', nullable: false })
    userId!: number;
}
