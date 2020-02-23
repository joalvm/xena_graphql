import { GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLResolveInfo, GraphQLBoolean } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Company as CompanyType } from '../types'
import { Companies as CompaniesRepository } from '../../repositories'

export default {
    listCompanies: {
        type: new GraphQLList(CompanyType),
        description: 'Lista de empresas aperturadas por el usuario',
        args: {
            default: {
                type: GraphQLBoolean,
                description: 'Filtra la empresa que es por defecto seleccionada al momento de iniciar session en la web'
            }
        },
        resolve(source: any, args: any, ctx: any, info: GraphQLResolveInfo) {
            const repository = getCustomRepository(CompaniesRepository)
            repository.setAuth(ctx.session, info.fieldName)
            return repository.all(args.default)
        },
    },
    findCompany: {
        type: CompanyType,
        description: 'Busca una empresa',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(_: any, { id }: { id: number }) {
            return getCustomRepository(CompaniesRepository).find(id)
        },
    },
}
