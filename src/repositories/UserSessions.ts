import { AbstractRepository, EntityRepository, getRepository } from 'typeorm-plus'
import { UsersSessions as UserSessionEntity } from '../entities/UsersSessions'
import { Users as UserEntity } from '../entities/Users'
import { Session } from '../interfaces'
import { fill } from '../helpers'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import Unauthorized from '../exceptions/Unauthorized'
import config from '../config'

@EntityRepository(UserSessionEntity)
export default class UserSessions extends AbstractRepository<UserSessionEntity> {
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

  async save(user: UserEntity, data: Session): Promise<UserSessionEntity> {
    const entity = this.repository.create()

    fill(entity, data)

    entity.user = user

    return this.repository.save(entity)
  }

  async login(username: string, password: string, remember_me: boolean, agent: object) {
    const expireIn = this.expire()
    const user = await this.validateUser(username, password)
    const entity = await this.generateSession(user, expireIn, agent)

    const token: string = sign(
      {
        kid: entity.id,
        uid: user.id,
        adm: user.isAdmin
      },
      config('app.key'),
      !remember_me ? { expiresIn: expireIn } : {}
    )

    entity.token = token

    await this.repository.update({ id: entity.id }, entity)

    return {
      id: entity.id,
      userId: user.id,
      token: token,
      expireIn: expireIn,
    }
  }

  private async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await getRepository(UserEntity).findOne({
      where: { username: username },
    })

    if (!user) {
      throw new Unauthorized('Username/Password incorrect')
    }

    if (!compareSync(`${user.salt}:${password}`, user.password ?? '')) {
      throw new Unauthorized('Username/Password incorrect')
    }

    return user
  }

  private async generateSession(user: UserEntity, expireIn: number, agent: Object): Promise<UserSessionEntity> {
    const entity = this.repository.create()
    const data = {
      ...agent,
      ...{
        user: user,
        token: '-',
        expire: new Date(expireIn * 1000).toUTCString(),
      },
    }

    fill(entity, data)

    return await this.repository.save(entity)
  }

  private expire(): number {
    return Math.floor(Date.now() / 1000) + 48 * 60 * 60
  }
}
