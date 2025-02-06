import express from 'express'
import { create_user, get_all, get_one } from '../controller/UserController'

const router = express.Router()

router.get('/get_all',get_all);
router.get('/get_one',get_one);
router.post('/create_user',create_user);



// router.get('/get_all', (req: Request, res: Response) => {
//     const users = getAllUsers()
//     res.sendResponse(users)
// })

// router.post('/create_user', async (req: Request, res: Response) => {
//     const { username, password, confirm_password, name } = req.body

//     if(!username){
//         throw new ValidationError("username not given")
//         res.status(400).json({error: });
//     }
//     if(!password){
//         res.status(400).json({error: "password not given"});
//     }
//     if(!confirm_password){
//         res.status(400).json({error: "confirm_password not given"});
//     }
//     if(!name){
//         res.status(400).json({error: "name not given"});
//     }
//     if(password !== confirm_password){
//         res.status(400).json({error: "password and confirm password not match"});
//     }

//     const newUser = await User.create(req.body)
//     res.sendResponse({})
// })

// router.post('/get_one', (req: Request, res: Response) => {
//     const { id } = req.body
//     if(!id){
//         res.status(400).json({msg: "Id must"})
//         return
//     }

//     const user = getUserById(id)
//     if(!user){
//         res.status(404).json({msg: "User not found"})
//         return
//     }
//     res.sendResponse(user)
// })

export const UserRoute = router