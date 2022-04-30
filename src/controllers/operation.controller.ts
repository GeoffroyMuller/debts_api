import { Request, Response } from "express"
import { IAuthRequest } from "../middlewares/auth.middleware"
import OperationService from "../services/operation.service"


async function findAll(req: IAuthRequest, res: Response) {
    try {
        res.json(await OperationService.findAllForUser(req.auth?.id as number)).status(200)
    } catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

async function create(req: IAuthRequest, res: Response) {
    try {
        res.json(await OperationService.create(req.body)).status(200)
    } catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

async function getTotal(req: IAuthRequest, res: Response) {
    try {
        res.json(await OperationService.getTotalForUser(req.auth?.id as number)).status(200)
    } catch (err) {
        console.error(err)
        res.status(500).end()
    }
    
}

export default {
    findAll,
    create,
    getTotal
}