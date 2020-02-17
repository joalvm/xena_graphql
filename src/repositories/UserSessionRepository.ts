import { AbstractRepository, EntityRepository, getRepository, Repository } from 'typeorm-plus'
import {UsersSessions as UserSessionEntity} from '../entities/UsersSessions'
import { Session } from '../interfaces'
import { fill } from '../helpers'
import {Users as UserEntity} from '../entities/Users'
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

  async save(user: UserEntity, data: Session): Promise<UserSessionEntity> {
    const entity = this.repository.create()

    fill(entity, data)

    entity.user = user

    return this.repository.save(entity)
  }

  async login(username: string, password: string, remember_me: boolean, agent: object) {

    const user: UserEntity = this.validateUser(username, password)
    const entity: UserSessionEntity = this.generateSession(user, agent)

    const token: string = sign(
      {
        kid: entity.id,
        uid: user.id,
        adm: user.isAdmin,
        exp: entity.expire
      },
      config('app.key'),
      !remember_me ? { expiresIn: entity.expire.getSeconds() } : {}
    )

    await this.repository.update({ id: entity.expire.getSeconds() }, entity)

    return {
      id: entity.id,
      userId: user.id,
      token: token,
      expireIn: entity.expire.getSeconds()
    }
  }

  private validateUser(username: string, password: string): UserEntity {
    let user: UserEntity|undefined;

    (async (_u) => {
      return getRepository(UserEntity).findOne({where: { username: _u }})
    })(username).then(value => user = value)

    if (!user) {
      throw new Unauthorized('Username/Password incorrect')
    }

    if (!compareSync(`${user.salt}:${password}`, user.password ?? '')) {
      throw new Unauthorized('Username/Password incorrect')
    }

    return user
  }

  private generateSession(user: UserEntity, agent: Object): UserSessionEntity {
    let entity = this.repository.create()
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

    (async (_e: UserSessionEntity) => {
      return await this.repository.save(_e)
    })(entity).bind(this)

    return entity;
  }

  private expire(): number {
    return Math.floor(Date.now() / 1000) + 48 * 60 * 60
  }
}
