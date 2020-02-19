import { AbstractRepository, EntityRepository, In } from "typeorm-plus";
import { Districts as DistrictsEntity } from "../entities/Districts";
import NotFound from "../exceptions/NotFound";
import Unauthorized from "../exceptions/Unauthorized";

@EntityRepository(DistrictsEntity)
export default class Districts extends AbstractRepository<DistrictsEntity> {
    constructor() {
        super()
    }

    async all(): Promise<DistrictsEntity[]> {
        return await this.repository.find({ where: { deletedAt: null } })
    }

    async find(id: number): Promise<DistrictsEntity> {
        return await this.repository.findOneOrFail(id, {
            where: { deletedAt: null }
        })
    }

    async findByUbigeoCode(code: string): Promise<DistrictsEntity> {
        return await this.repository.findOneOrFail({
            where: { code: code, deletedAt: null }
        })
    }

    async findByProvinces(provinces: number | number[]): Promise<DistrictsEntity[]> {
        return await this.repository.find({
            where: {
                provinceId: In(typeof provinces == 'number' ? [provinces] : provinces),
                deletedAt: null
            }
        })
    }
}
