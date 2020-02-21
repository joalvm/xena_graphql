import { EntityRepository } from "typeorm-plus";
import { Persons as PersonsEntity } from "../entities/Persons";
import { Genders, MaritalStatus } from "../enums";
import Repository from "./Repository";

interface PersonFilters {
    maritalStatus?: keyof typeof MaritalStatus
    gender?: keyof typeof Genders
    documentTypeId?: number
}

@EntityRepository(PersonsEntity)
export default class Persons extends Repository<PersonsEntity> {
    constructor() {
        super()
    }

    async all(filters: PersonFilters): Promise<PersonsEntity[]> {
        this.checkAuthorization()

        filters = filters || {}
        return await this.repository.find({
            where: {...filters, ...{deletedAt: null, userId: this.session.userId}}
        });
    }

    async find(id: number): Promise<PersonsEntity> {
        this.checkAuthorization()

        return await this.repository.findOneOrFail({
            where: {
                id: id,
                deletedAt: null,
                userId: this.session.userId
            }
        })
    }

    async save(body: Person): Promise<PersonsEntity> {
        this.checkAuthorization()

        return await this.repository.findOneOrFail({
            where: {
                id: id,
                deletedAt: null,
                userId: this.session.userId
            }
        })
    }
}
