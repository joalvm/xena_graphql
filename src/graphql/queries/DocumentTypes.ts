import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { DocumentTypes as DocumentTypesRepository } from '../../repositories'
import { DocumentType } from '../types'

export default {
  listDocumentTypes: {
    type: new GraphQLList(DocumentType),
    description: 'Lista los tipos de documentos',
    resolve() {
      return getCustomRepository(DocumentTypesRepository).all()
    },
  },
  findDocumentType: {
    type: DocumentType,
    description: 'Busca un tipo de documento',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(_: any, { id }: { id: number }) {
      return getCustomRepository(DocumentTypesRepository).find(id)
    },
  },
}
