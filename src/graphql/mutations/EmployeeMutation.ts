import { EmployeeType } from '../types'
import EmployeeInput from '../inputs/EmployeeInput'
import { GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import EmployeeRepository from '../../repositories/EmployeeRepository'
import EmployeeInterface from '../../interfaces/EmployeeInterface'

export default {
  newEmployee: {
    type: EmployeeType,
    description: 'Crea un recurso Employee',
    args: {
      attributes: {
        type: new GraphQLNonNull(EmployeeInput())
      },
    },
    resolve(_: any, { attributes }: { attributes: EmployeeInterface }) {
      return getCustomRepository(EmployeeRepository).save(attributes)
    },
  },
  editEmployee: {
    type: EmployeeType,
    description: 'Editar un recurso Employee',
    args: {
      id: { type: GraphQLInt },
      attributes: { type: EmployeeInput(false) },
    },
    resolve(_: any, { id, attributes }: { id: number, attributes: EmployeeInterface }) {
      return getCustomRepository(EmployeeRepository).update(id, attributes)
    },
  },
  deleteEmployee: {
    type: GraphQLBoolean,
    description: 'Elimina un recurso Employee',
    args: { id: { type: GraphQLInt } },
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(EmployeeRepository).delete(id)
    },
  },
}
