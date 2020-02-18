import { User as UserType } from '../types'
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import UsersRepository from '../../repositories/Users'

export default {
  listUsers: {
    type: new GraphQLList(UserType),
    description: 'Lista completa de Usuarios',
    resolve() {
      return getCustomRepository(UsersRepository).all()
    },
  },
  findUser: {
    type: UserType,
    description: 'Buscar  Usuarios',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(UsersRepository).find(id)
    },
  },
}
