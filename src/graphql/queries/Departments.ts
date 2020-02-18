import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Department as DepartmentType } from '../types'

export default {
  listDepartments: {
    type: new GraphQLList(DepartmentType),
    description: 'Lista de departamentos',
    resolve() {
      return []
    },
  },
  findDepartment: {
    type: DepartmentType,
    description: 'Busca un departamento',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(_: any, { id }: { id: number }) {
      return null
    },
  },
}
