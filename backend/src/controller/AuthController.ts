import express, { Response, Request } from 'express'
import { getUserByUsername } from '../services/User.service';
import bcrypt from 'bcryptjs'
import { generateToken } from '../services/Jwt.service';

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if(!username || !password){
    res.status(400).json({msg: "Username and Password must to login"})
    return 
  }

  const user: any = getUserByUsername(username)
  if(!user){
    res.status(404).json({msg: "User not found!"})
    return
  }

  const pwMatch = await bcrypt.compare(password, user.password)
  if(!pwMatch){
    res.status(404).json({msg: "Invalid Credentials!"})
    return
  }

  const token = generateToken(user)
  res.sendResponse({ token })

})

export default router