import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Department as DepartmentType } from '../types'
import { Departments as DepartmentsRepository } from '../../repositories'

export default {
  listDepartments: {
    type: new GraphQLList(DepartmentType),
    description: 'Lista de departamentos',
    resolve() {
      return getCustomRepository(DepartmentsRepository).all()
    },
  },
  findDepartment: {
    type: DepartmentType,
    description: 'Busca un departamento',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(_: any, { id }: { id: number }) {
        return getCustomRepository(DepartmentsRepository).find(id)
    },
  },
}
