import { EntityRepository, AbstractRepository } from 'typeorm-plus'
import { Users as UserEntity } from '../entities/Users'
import { hashSync } from 'bcrypt'
import { random } from '../helpers'
import { Users as UserInterface } from 'src/interfaces/Users'

@EntityRepository(UserEntity)
export default class UserRepository extends AbstractRepository<UserEntity> {
  constructor() {
    super()
  }

  async save(body: UserInterface): Promise<UserEntity> {
    const entity = this.repository.create()

    entity.name = body.name
    entity.lastname = body.lastname
    entity.gender = body.gender
    entity.email = body.email
    entity.avatarUrl = body.avatar_url || null

    // Session
    entity.salt = random(16)
    entity.username = body.username
    entity.password = hashSync(`${entity.salt}:${body.password}`, 12)
    entity.isAdmin = false
    entity.enabled = true

    return await this.repository.save(entity)
  }
}
