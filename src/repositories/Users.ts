import { EntityRepository, AbstractRepository } from 'typeorm-plus'
import { Users as UserEntity } from '../entities/Users'
import { hashSync } from 'bcrypt'
import { random, fill } from '../helpers'
import { User } from '../interfaces'
import NotFound from '../exceptions/NotFound'

@EntityRepository(UserEntity)
export default class Users extends AbstractRepository<UserEntity> {
  constructor() {
    super()
  }

  async all(): Promise<UserEntity[]> {
    return await this.repository.find({ where: { deletedAt: null } })
  }

  async find(id: number): Promise<UserEntity> {
    return await this.repository.findOneOrFail(id, { where: { deletedAt: null } })
  }

  async save(body: User): Promise<UserEntity> {
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

  async update(id: number, body: User): Promise<UserEntity> {
    const user = await this.find(id)

    if (!user) {
      throw new NotFound('Usuario no encontrado')
    }

    fill(user, body, ['salt', 'password'])

    this.repository.update({id: id}, user)

    return user
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.find(id)

    if (!user) {
      throw new NotFound('Usuario no encontrado')
    }

    return (await this.repository.softDelete({id: id})).affected == 1
  }
}
