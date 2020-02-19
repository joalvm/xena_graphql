import { AbstractRepository, EntityRepository, In, getCustomRepository } from "typeorm-plus";
import { Companies as CompaniesEntity } from "../entities/Companies";
import { Users as UsersRepository } from "..//repositories";
import Company from "src/interfaces/Company";

@EntityRepository(CompaniesEntity)
export default class Companies extends AbstractRepository<CompaniesEntity> {
    constructor() {
        super()
    }

    async all(): Promise<CompaniesEntity[]> {
        return await this.repository.find({where: {deletedAt: null}})
    }

    async find(id: number): Promise<CompaniesEntity> {
        return await this.repository.findOneOrFail(id, {where: {deletedAt: null}})
    }

    async save(userId: number, body: Company): Promise<CompaniesEntity> {
        const userEntity = getCustomRepository(UsersRepository).find(userId)

        return this.repository.save(this.repository.create([{
            ...body,
            ...{user: userEntity}
        }]));
    }

    async findByIds(ids: number[]): Promise<CompaniesEntity[]> {
        return await this.repository.find({
            where: {id: In(ids), deletedAt: null}
        })
    }

    async findByUsers(userIds: number[]): Promise<CompaniesEntity[]> {
        return await this.repository.find({
            where: {userId: In(userIds), deletedAt: null}
        })
    }
}
