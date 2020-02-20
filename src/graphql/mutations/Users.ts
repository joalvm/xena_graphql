import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql'
import { Users as UsersRepository, UserSessions as UserSessionRepository } from '../../repositories'
import { getCustomRepository } from 'typeorm-plus'
import { User as UserType } from '../types'
import { Request } from 'express'
import { User } from '../../interfaces'
import UserInput from '../inputs/UserInput'

interface Login {
  username: string
  password: string
  rememberMe: boolean
}

export default {
  newUser: {
    type: UserType,
    description: 'Asigna un usuario a un empleado',
    args: {
      body: {
        type: UserInput(),
      },
    },
    resolve(_: any, { body }: { body: User }) {
      return getCustomRepository(UsersRepository).save(body)
    },
  },
  editUser: {
    type: UserType,
    description: 'Editar un usuario',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      body: {
        type: UserInput(false),
      },
    },
    resolve(_: any, { id, body }: { id: number; body: User }) {
      return getCustomRepository(UsersRepository).update(id, body)
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    description: 'Eliminar un usuario',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(UsersRepository).delete(id)
    },
  },
  login: {
    type: new GraphQLObjectType({
      name: 'LoginType',
      fields: () => ({
        id: { type: GraphQLInt },
        userId: { type: GraphQLInt },
        employeeId: { type: GraphQLInt },
        token: { type: GraphQLString },
        expireIn: { type: GraphQLInt },
      }),
    }),
    description: 'Acceso al sistema',
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      rememberMe: { type: GraphQLBoolean },
    },
    resolve(_: any, { username, password, rememberMe }: Login, context: Request) {
      return getCustomRepository(UserSessionRepository).login(username, password, rememberMe, {
        ip: context.ip,
        browser: context.useragent?.browser,
        version: context.useragent?.version,
        platform: context.useragent?.os,
      })
    },
  },
}
