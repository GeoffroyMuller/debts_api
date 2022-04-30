import Operation from "../models/operation.model"
import User from "../models/user.model"

export default class OperationService {
    static async findAllForUser(userId: number) {
        const user = await User
            .query()
            .findById(userId)
            .withGraphFetched('operations_credit.[creditor, debtor]')
            .withGraphFetched('operations_debt.[creditor, debtor]')

        return [
            ...user?.operations_credit || [],
            ...user?.operations_debt || [],
        ]
    }

    static async getTotalForUser(userId: number) {
        
        const operations = await Operation
            .query()
            .where(builder => builder.where('creditorId', userId).orWhere('debtorId', userId))

        let debt = 0
        let credit = 0
        
        for (const operation of operations) {
            if (operation.debtorId == userId) {
                debt += operation.amount || 0
            } else {
                credit += operation.amount || 0
            }
        }

        return  {
            debt,
            credit
        }
    }

    static async getById(id: number) {
        return await Operation.query().findById(id)
    }

    static async delete(id: number) {
        return await Operation.query().deleteById(id)
    }

    static async create(data: any) {
        data.operationDate = new Date()
        return await Operation.query().insertAndFetch(data)
    }

    static async update(id: number, body: any) {
        return await Operation.query().updateAndFetchById(id, body)
    }


} 