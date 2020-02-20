import { AbstractRepository, EntityRepository } from "typeorm-plus";
import { Persons as PersonsEntity } from "../entities/Persons";

@EntityRepository(PersonsEntity)
export default class Persons extends AbstractRepository<PersonsEntity> {
    constructor() {
        super()
    }

    async all(): Promise<PersonsEntity[]> {
        return await this.repository.find({where: {deletedAt: null}});
    }

    async find(id: number): Promise<PersonsEntity> {
        return await this.repository.findOneOrFail({
            where: {
                id: id,
                deletedAt: null
            }
        })
    }
}
