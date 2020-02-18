import { AbstractRepository, EntityRepository } from 'typeorm-plus'
import { DocumentTypes as DocumentTypesEntity } from '../entities/DocumentTypes'

@EntityRepository(DocumentTypesEntity)
export default class DocumentTypes extends AbstractRepository<DocumentTypesEntity> {
  constructor() {
    super()
  }

  async all(): Promise<DocumentTypesEntity[]> {
    return await this.repository.find({ where: { deletedAt: null } })
  }

  async find(id: number): Promise<DocumentTypesEntity> {
    return await this.repository.findOneOrFail(id, { where: { deletedAt: null } })
  }
}
