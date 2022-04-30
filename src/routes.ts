import { Application } from "express"

import AuthController from "./controllers/auth.controller"
import OperationController from "./controllers/operation.controller"
import UserController from "./controllers/user.controller"



import authMiddleware from "./middlewares/auth.middleware"


export default function Routes(app: Application) {

    app.post('/auth/login', AuthController.login)

    app.post('/users', UserController.create)
    /*
    app.put('/users/:id', authMiddleware, UserController.update)
    app.delete('/users/:id', authMiddleware,UserController.deleteById)
    app.get('/users/:id', authMiddleware, UserController.getById)
    */

    app.get('/operations', authMiddleware ,OperationController.findAll)
    app.get('/operations/totals', authMiddleware ,OperationController.getTotal)
    app.post('/operations', authMiddleware ,OperationController.create)

    app.get('/contacts', authMiddleware, UserController.findAll)
    app.get('/contacts/:id', authMiddleware, UserController.getById)


} 