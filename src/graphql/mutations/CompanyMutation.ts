import { GraphQLInt, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { CompanyType } from '../types'
import { CompanyInterface } from '../../interfaces'
import CompanyInput from '../inputs/CompanyInput'
import CompanyRepository from '../../repositories/CompanyRepository'

export default {
  newCompany: {
    type: CompanyType,
    description: 'Crea una compañia',
    args: {
      attributes: { type: CompanyInput() },
    },
    resolve(_: any, { attributes }: { attributes: CompanyInterface }) {
      return getCustomRepository(CompanyRepository).save(attributes)
    },
  },
  editCompany: {
    type: CompanyType,
    description: 'Editar datos de la compañia',
    args: {
      id: { type: GraphQLInt },
      attributes: { type: CompanyInput(false) },
    },
    resolve(_: any, { id, attributes }: { id: number, attributes: CompanyInterface }) {
      return getCustomRepository(CompanyRepository).update(id, attributes)
    },
  },
  deleteCompany: {
    type: GraphQLBoolean,
    description: 'Elimna datos de la compañia',
    args: {id: { type: GraphQLInt }},
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(CompanyRepository).delete(id)
    },
  }
}
