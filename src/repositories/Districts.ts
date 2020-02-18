import { AbstractRepository, EntityRepository } from "typeorm-plus";
import { Districts as DistrictsEntity } from "../entities/Districts";

@EntityRepository(DistrictsEntity)
export default class Districts extends AbstractRepository<DistrictsEntity> {
    constructor() {
        super()
    }
}
