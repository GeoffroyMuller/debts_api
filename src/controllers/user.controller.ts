import { Request, Response } from "express"
import { IAuthRequest } from "../middlewares/auth.middleware"
import UserService from "../services/user.service"

async function findAll(req: IAuthRequest, res: Response) {
    res.json(await UserService.findAll(req.auth?.id as number))
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await UserService.getById(req.params.id as unknown as number))
}

async function create(req: IAuthRequest, res: Response) {
    try {
        res.json(await UserService.create(req.body))
    } catch (err) {
        res.status(500).end();
    }
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await UserService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await UserService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}