import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId
} from "typeorm-plus";
import { Companies } from "./Companies";
import { CompanyPositions } from "./CompanyPositions";
import { CostCenters } from "./CostCenters";
import { OrganizationalUnits } from "./OrganizationalUnits";
import { Persons } from "./Persons";
import { StaffArea } from "./StaffArea";
import { StaffDivision } from "./StaffDivision";
import { FishingCompanyParameters } from "./FishingCompanyParameters";

@Index("employees_pkey", ["id"], { unique: true })
@Entity("employees", { schema: "public" })
export class Employees extends BaseEntity {
    constructor(init?: Partial<Employees>) {
        super();
        Object.assign(this, init);
    }

    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

    @Column("character varying", { name: "code", length: 15 })
    code!: string;

    @Column("date", { name: "date_entry", nullable: true })
    dateEntry!: string | null;

    @Column("character varying", { name: "email", nullable: true, length: 80 })
    email!: string | null;

    @Column("boolean", { name: "eps_affiliate", nullable: true })
    epsAffiliate!: boolean | null;

    @Column("character varying", { name: "eps_plan", nullable: true, length: 50 })
    epsPlan!: string | null;

    @Column("character varying", {
        name: "eps_option",
        nullable: true,
        length: 20
    })
    epsOption!: string | null;

    @Column("boolean", { name: "affiliated", nullable: true })
    affiliated!: boolean | null;

    @Column("boolean", { name: "sctr_affiliate", nullable: true })
    sctrAffiliate!: boolean | null;

    @Column("boolean", { name: "ev_affiliate", nullable: true })
    evAffiliate!: boolean | null;

    @Column("integer", { name: "boss", nullable: true })
    boss!: number | null;

    @Column("timestamp with time zone", {
        name: "created_at",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date | null;

    @Column("timestamp with time zone", { name: "updated_at", nullable: true })
    updatedAt!: Date | null;

    @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
    deletedAt!: Date | null;

    @ManyToOne(() => Companies, companies => companies.employees)
    @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
    company!: Companies;

    @ManyToOne(() => CompanyPositions, companyPositions => companyPositions.employees)
    @JoinColumn([{ name: "company_position_id", referencedColumnName: "id" }])
    companyPosition!: CompanyPositions;

    @ManyToOne(() => CostCenters, costCenters => costCenters.employees)
    @JoinColumn([{ name: "cost_center_id", referencedColumnName: "id" }])
    costCenter!: CostCenters;

    @ManyToOne(() => OrganizationalUnits, organizationalUnits => organizationalUnits.employees)
    @JoinColumn([{ name: "organizational_unit_id", referencedColumnName: "id" }])
    organizationalUnit!: OrganizationalUnits;

    @ManyToOne(() => Persons, persons => persons.employees)
    @JoinColumn([{ name: "person_id", referencedColumnName: "id" }])
    person!: Persons;

    @ManyToOne(() => StaffArea, staffArea => staffArea.employees)
    @JoinColumn([{ name: "staff_area_id", referencedColumnName: "id" }])
    staffArea!: StaffArea;

    @ManyToOne(() => StaffDivision, staffDivision => staffDivision.employees)
    @JoinColumn([{ name: "staff_division_id", referencedColumnName: "id" }])
    staffDivision!: StaffDivision;

    @OneToMany(() => FishingCompanyParameters, fishingCompanyParameters => fishingCompanyParameters.employee)
    fishingCompanyParameters!: FishingCompanyParameters[];

    @RelationId((employees: Employees) => employees.company)
    companyId!: number;

    @RelationId((employees: Employees) => employees.companyPosition)
    companyPositionId!: number;

    @RelationId((employees: Employees) => employees.costCenter)
    costCenterId!: number;

    @RelationId((employees: Employees) => employees.organizationalUnit)
    organizationalUnitId!: number;

    @RelationId((employees: Employees) => employees.person)
    personId!: number;

    @RelationId((employees: Employees) => employees.staffArea)
    staffAreaId!: number;

    @RelationId((employees: Employees) => employees.staffDivision)
    staffDivisionId!: number;
}
