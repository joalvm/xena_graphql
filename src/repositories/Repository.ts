import { AbstractRepository, ObjectLiteral, getRepository } from "typeorm-plus";
import { UsersSessions } from "../entities/UsersSessions";
import Unauthorized from "../exceptions/Unauthorized";
import {isUndefined} from 'lodash'

interface ISession extends Object {
    token: string,
    sessionId: number
    userId: number
    isAdmin: boolean
    currentCompany: number
}

export default class Repository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
    private queryName = ''
    protected checkAuth = false
    protected omitQueries = ['login']
    protected session: ISession = {
        token: '',
        sessionId: 0,
        userId: 0,
        isAdmin: false,
        currentCompany: 0
    }

    constructor() {
        super()
    }

    setAuth(session: ISession, queryName: string) {
        this.session = {...this.session, ...session}
        this.queryName = queryName

        return this
    }

    protected async checkAuthorization() {
        if (this.checkAuth) {
            if (!this.omitQueries.includes(this.queryName)) {
                if (!(await this.isSessionActived())) {
                    throw new Unauthorized
                }
            }
        }
    }

    async isSessionActived(): Promise<boolean> {
        const repository = getRepository(UsersSessions);

        const session = await repository.findOne(
            this.session.sessionId,
            { where: { closedAt: null } }
        )
            console.log(this.session);
        return !isUndefined(session)
    }

    enableCheckAutorization() {
        this.checkAuth = true
        return this
    }
}
