import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import * as queries from './queries'
import * as mutations from './mutations'
import { get } from 'lodash'

const RootQuery = new GraphQLObjectType<any, any, any>({
  name: 'Queries',
  description: 'Todas las consultas, Peticiones GET',
  fields: ((q: object) => {
    let result = {}
    for (const key in q) {
      if (q.hasOwnProperty(key)) result = Object.assign(result, get(q, key))
    }
    return result
  })(queries)
})

const RootMutation = new GraphQLObjectType<any, any, any>({
  name: 'Mutations',
  description: 'Todas las acciones, Peticiones POST',
  fields: ((m) => {
    let result = {}
    for (const key in m) {
      if (m.hasOwnProperty(key))result = Object.assign(result, get(m, key))
    }
    return result
  })(mutations)
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
