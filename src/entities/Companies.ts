import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm-plus";
import { Users } from "./Users";
import { CompanyPositions } from "./CompanyPositions";
import { Employees } from "./Employees";
import { FishingVessels } from "./FishingVessels";
import { UsersCollaborators } from "./UsersCollaborators";

@Index("companies_pkey", ["id"], { unique: true })
@Entity("companies", { schema: "public" })
export class Companies extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column('int4', { name: "user_id" })
  userId!: number;

  @Column("character varying", { name: "name", length: 80 })
  name!: string;

  @Column("character varying", { name: "business_name", length: 100 })
  businessName!: string;

  @Column("character varying", { name: "ruc", length: 15 })
  ruc!: string;

  @Column("character varying", {
    name: "square_icon",
    nullable: true,
    length: 150
  })
  squareIcon?: string;

  @Column("character varying", {
    name: "rectangle_icon",
    nullable: true,
    length: 150
  })
  rectangleIcon?: string;

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

  @ManyToOne(() => Users, users => users.companies)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: Users;

  @OneToMany(() => CompanyPositions, companyPositions => companyPositions.company)
  companyPositions!: CompanyPositions[];

  @OneToMany(() => Employees, employees => employees.person)
  employees!: Employees[];

  @OneToMany(() => FishingVessels, fishingVessels => fishingVessels.company)
  fishingVessels!: FishingVessels[];

  @OneToMany(() => UsersCollaborators, usersCollaborators => usersCollaborators.company)
  usersCollaborators!: UsersCollaborators[];

  constructor(init?: Partial<Companies>) {
    super();
    Object.assign(this, init);
  }
}
