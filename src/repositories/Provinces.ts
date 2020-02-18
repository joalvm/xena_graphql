import { AbstractRepository, EntityRepository } from "typeorm-plus";
import { Provinces as ProvincesEntity } from "../entities/Provinces";

@EntityRepository(ProvincesEntity)
export default class Provinces extends AbstractRepository<ProvincesEntity> {
    constructor() {
        super()
    }
}
