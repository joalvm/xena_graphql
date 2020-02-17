import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { getRepository } from 'typeorm-plus'
import EmployeeType from './EmployeeType'
import {Companies as CompanyEntity} from '../../entities/Companies'
import { resolveMeta } from '../../helpers'

const CompanyType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    business_name: { type: GraphQLString },
    ruc: { type: GraphQLString },
    square_icon: { type: GraphQLString },
    rectangle_icon: { type: GraphQLString },
    employees: {
      type: new GraphQLList(EmployeeType),
      async resolve(source) {
        // const data = (
        //   (
        //     await getRepository(CompanyEntity)
        //       .createQueryBuilder('company')
        //       .leftJoinAndSelect('company.employees', 'employees')
        //       .where({ id: source.id })
        //       .getOne()
        //   )?.employees ?? []
        // )

        // console.log(data);

        // return data;
      },
    },
    created_at: {type: GraphQLString, resolve: resolveMeta('created_at')},
    updated_at: { type: GraphQLString, resolve: resolveMeta('updated_at') },
  }),
})

export default CompanyType
