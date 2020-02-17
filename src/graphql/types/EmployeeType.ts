import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'
import { getRepository } from 'typeorm-plus'
import { resolveMeta } from '../../helpers'
import GenderEnum from '../enums/Genders'
import CompanyType from './CompanyType'
import UserType from './UserType'
import {Employees as EmployeeEntity} from '../../entities/Employees'

const EmployeeType: GraphQLObjectType<any, any, any> = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    gender: { type: GenderEnum },
    email: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    company: {
      type: CompanyType,
      async resolve(source) {
        // const entity = getRepository(EmployeeEntity)

        // const employee: EmployeeEntity | undefined = await entity.findOne({
        //   relations: ['company'],
        //   where: { id: source.id },
        // })

        // return employee?.company
      },
    },
    user: {
      type: UserType,
      async resolve(source) {
        // const entity = getRepository(EmployeeEntity)

        // const employee: EmployeeEntity | undefined = await entity.findOne({
        //   relations: ['user'],
        //   where: {id: source.id}
        // })

        // return employee?.user
      },
    },
    created_at: { type: GraphQLString, resolve: resolveMeta('created_at') },
    updated_at: { type: GraphQLString, resolve: resolveMeta('updated_at') },
  }),
})

export default EmployeeType
