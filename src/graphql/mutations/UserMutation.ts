import { UserType } from '../types'
import { getCustomRepository } from 'typeorm-plus'
import { GraphQLNonNull, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'
import UserRepository from '../../repositories/UserRepository'
import UserInput from '../inputs/UserInput'
import UserSessionRepository from '../../repositories/UserSessionRepository'
import { Request } from 'express'

interface UserAttribute {
  username: string
  password: string
}

interface UserParam {
  employeeId: number
  attributes: UserAttribute
}

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
      employeeId: { type: GraphQLInt },
      attributes: {
        type: new GraphQLNonNull(UserInput),
      },
    },
    resolve(_: any, { employeeId, attributes }: UserParam) {
      return getCustomRepository(UserRepository).save(employeeId, attributes.username, attributes.password)
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

      return repository.login(
        username,
        password,
        rememberMe,
        {
          ip: context.ip,
          browser: context.useragent?.browser,
          version: context.useragent?.version,
          platform: context.useragent?.os
        }
      )
    },
  },
}
