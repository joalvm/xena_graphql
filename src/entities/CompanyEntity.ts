import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, DeleteDateColumn } from "typeorm-plus";
import EmployeeEntity from './EmployeeEntity';

@Entity({name: 'companies', })
export default class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', {nullable: false, length: 100})
  name?: string;

  @Column('varchar', {nullable: false, length: 150})
  business_name?: string;

  @Column('varchar', {nullable: false, length: 15})
  ruc?: string;

  @Column('varchar', {nullable: true, length: 150})
  square_icon?: string;

  @Column('varchar', {nullable: true, length: 150})
  rectangle_icon?: string;

  @Column('timestamptz', {nullable: true})
  created_at?: number;

  @Column('timestamptz', {nullable: true})
  updated_at?: string;

  @DeleteDateColumn({type: 'timestamptz', name: 'deleted_at'})
  deleted_at?: string;

  @OneToMany(() => EmployeeEntity, (employee: EmployeeEntity) => employee.company)
  employees: EmployeeEntity[] | undefined;
}
