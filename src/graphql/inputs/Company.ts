import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from 'graphql'

/**
 * Se creo en funcion para permitir una carga dinamica para parametros opcionales
 * @param isSave boolean
 */
export default function(isSave = true) {
  const prefix = isSave ? 'New' : 'Edit'

  return new GraphQLInputObjectType({
    name: `${prefix}CompanyInput`,
    fields: () => ({
      name: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      businessName: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      ruc: { type: isSave ? new GraphQLNonNull(GraphQLString) : GraphQLString },
      squareIcon: { type: GraphQLString },
      rectangleIcon: { type: GraphQLString },
    }),
  })
}
