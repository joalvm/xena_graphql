import { AbstractRepository, ObjectLiteral } from "typeorm-plus";

interface ISession extends Object {
    sessionId: number
    userId: number
    companyId: number
    isAdmin: boolean
}

export default class Repository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
    protected session: ISession = {
        sessionId: 0,
        userId: 0,
        isAdmin: false,
        companyId: 0
    }

    constructor() {
        super()
    }

    setSession(session: ISession) {
        this.session = session
    }
}
