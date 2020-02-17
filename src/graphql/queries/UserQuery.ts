import { UserType } from '../types';
import { GraphQLList } from 'graphql';
import { getCustomRepository } from 'typeorm-plus';
import UserRepository from '../../repositories/UserRepository';

export default {
    listUsers: {
        type: new GraphQLList(UserType),
        description: 'Lista completa de Usuarios',
        args: {},
        resolve() {
            return getCustomRepository(UserRepository).all();
        },
      },
}
