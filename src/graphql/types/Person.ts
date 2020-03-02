import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Gender, MaritalStatus } from '../enums'
import { resolveMeta } from '../../helpers'
import NodeInterface from '../interfaces/Node'
import DocumentType from './DocumentType'
import DataLoader = require('dataloader')
import { DocumentTypes as DocumentTypesRepository } from '../../repositories'

const DocumentTypeDL = new DataLoader(
    async (keys) => {
        const ids: number[] = Object.assign([], keys);
        const repository = getCustomRepository(DocumentTypesRepository);

        return await repository.builder().whereInIds(ids).getMany()
    }
)

export default new GraphQLObjectType({
    name: 'Person',
    description: 'Personas registradas',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        gender: {type: Gender },
        maritalStatus: { type: MaritalStatus },
        documentNumber: { type: GraphQLString },
        documentType: {
            type: DocumentType,
            async resolve(root:any) {
                return await DocumentTypeDL.load(root.documentTypeId)
            }
        },
        dateOfBirth: { type: GraphQLString },
        direction: { type: GraphQLString },
        phone: { type: GraphQLString },
        mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        avatarUrl: { type: GraphQLString },
        createdAt: { type: GraphQLString, resolve: resolveMeta('createdAt') },
        updatedAt: { type: GraphQLString, resolve: resolveMeta('updatedAt') },
    }),
    interfaces: [NodeInterface]
})

