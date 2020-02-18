import { AbstractRepository, EntityRepository } from "typeorm-plus";
import { Persons as PersonsEntity } from "../entities/Persons";

@EntityRepository(PersonsEntity)
export default class Persons extends AbstractRepository<PersonsEntity> {
    constructor() {
        super()
    }
}
