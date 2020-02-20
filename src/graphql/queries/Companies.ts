import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql'
import { getCustomRepository } from 'typeorm-plus'
import { Company as CompanyType } from '../types'
import { Companies as CompaniesRepository } from '../../repositories'

export default {
    listCompanies: {
        type: new GraphQLList(CompanyType),
        description: 'Lista de empresas aperturadas por el usuario',
        resolve() {
            return getCustomRepository(CompaniesRepository).all()
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
