import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql'
import { EmployeeType } from '../types'
import { getCustomRepository } from 'typeorm-plus'
import EmployeeRepository from '../../repositories/EmployeeRepository'

export default {
  listEmployees: {
    type: new GraphQLList(EmployeeType),
    description: 'Lista completa de empleados',
    args: {},
    resolve() {
      return getCustomRepository(EmployeeRepository).all()
    },
  },
  findEmployee: {
    type: EmployeeType,
    description: 'Buscar un empleado',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(EmployeeRepository).find(id)
    },
  },
}
