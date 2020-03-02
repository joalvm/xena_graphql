import { AbstractRepository, EntityRepository, SelectQueryBuilder } from 'typeorm-plus'
import { DocumentTypes as DocumentTypesEntity } from '../entities/DocumentTypes'

type Builder = SelectQueryBuilder<DocumentTypesEntity>;

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

  builder(): Builder {
      return this.filter(
          this.manager.createQueryBuilder(DocumentTypesEntity, 'dt')
          .where({'dt.deleted_at': null})
      )
  }

  private filter(builder: Builder): Builder {
      return builder
  }
}
