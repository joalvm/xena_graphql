import { AbstractRepository, EntityRepository, getRepository } from 'typeorm-plus'
import UserSessionEntity from '../entities/UserSessionEntity'
import { SessionInterface } from '../interfaces'
import { fill } from '../helpers'
import UserEntity from '../entities/UserEntity'
import Unauthorized from '../exceptions/Unauthorized'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import config from '../config'

@EntityRepository(UserSessionEntity)
export default class UserSessionRepository extends AbstractRepository<UserSessionEntity> {
  constructor() {
    super()
  }

  async all(user?: UserEntity): Promise<UserSessionEntity[]> {
    let where = {}

    if (user !== undefined) {
      where = { where: { user_id: user.id } }
    }

    return await this.repository.find(where)
  }

  async find(id: number): Promise<UserSessionEntity | undefined> {
    return await this.repository.findOne(id)
  }

  async save(user: UserEntity, data: SessionInterface): Promise<UserSessionEntity> {
    const entity = this.repository.create()

    fill(entity, data)

    entity.user = user

    return this.repository.save(entity)
  }

  async login(username: string, password: string, remember_me: boolean, agent: object) {
    const entity = this.repository.create()
    const user = await getRepository(UserEntity).findOne({where: { username: username }})

    if (!user) {
      throw new Unauthorized('Username/Password incorrect')
    }

    if (!compareSync(`${user.salt}:${password}`, user.password ?? '')) {
      throw new Unauthorized('Username/Password incorrect')
    }

    const expireIn: number = this.expire()
    const data = {
      ...agent,
      ...{
        user: user,
        token: '-',
        expire: new Date(expireIn * 1000).toUTCString(),
      },
    }

    fill(entity, data)

    await this.repository.save(entity)

    const token: string = sign(
      {
        kid: entity.id,
        uid: user.id,
        adm: user.is_admin,
        exp: expireIn
      },
      config('app.key'),
      !remember_me ? { expiresIn: expireIn } : {}
    )

    entity.token

    await this.repository.update({ id: entity.id }, entity)

    return {
      id: entity.id,
      userId: user.id,
      token: token,
      employeeId: user.employee?.id,
      expireIn: expireIn
    }
  }

  private expire(): number {
    return Math.floor(Date.now() / 1000) + 48 * 60 * 60
  }
}
