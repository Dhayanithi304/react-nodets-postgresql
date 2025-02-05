import express, {Response, Request } from 'express'
import { getAllUsers, getUserById } from '../services/User.service'

const router = express.Router()

router.get('/get_all', (req: Request, res: Response) => {
    const users = getAllUsers()
    res.sendResponse(users)
})

router.post('/get_one', (req: Request, res: Response) => {
    const { id } = req.body
    if(!id){
        res.status(400).json({msg: "Id must"})
        return
    }

    const user = getUserById(id)
    if(!user){
        res.status(404).json({msg: "User not found"})
        return
    }
    res.sendResponse(user)
})