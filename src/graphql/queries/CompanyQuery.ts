/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { CompanyType } from '../types'
import CompanyRepository from '../../repositories/CompanyRepository'

export default {
  listCompanies: {
    type: new GraphQLList(CompanyType),
    description: 'Todas las empresas',
    args: {},
    resolve() {
      return getCustomRepository(CompanyRepository).all();
    }
  },
  findCompany: {
    type: CompanyType,
    description: 'filtro de empresa',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'Company ID'
      }
    },
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(CompanyRepository).find(id)
    }
  }
}
