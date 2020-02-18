import { AbstractRepository, EntityRepository } from "typeorm-plus";
import { Departments as DepartmentsEntity } from "../entities/Departments";

@EntityRepository(DepartmentsEntity)
export default class Departments extends AbstractRepository<DepartmentsEntity> {
    constructor() {
        super()
    }
}
