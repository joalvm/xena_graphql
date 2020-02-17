import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { UserType } from '../types'
import { Request } from 'express'
import { User } from '../../interfaces'
import UserInput from '../inputs/UserInput'
import UserRepository from '../../repositories/UserRepository'
import UserSessionRepository from '../../repositories/UserSessionRepository'

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
      return getCustomRepository(UserRepository).save(body)
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
      const repository = getCustomRepository(UserSessionRepository)

      return repository.login(username, password, rememberMe, {
        ip: context.ip,
        browser: context.useragent?.browser,
        version: context.useragent?.version,
        platform: context.useragent?.os,
      })
    },
  },
}
