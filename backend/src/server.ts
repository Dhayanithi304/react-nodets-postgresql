import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { responseMiddleware } from './middlewares/responseMiddleware'
import AuthRoute from './routes/AuthRoute'
import { AuthMiddleware } from './middlewares/AuthMiddleware'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.use(responseMiddleware)

app.use("/auth", AuthRoute)
app.use("/user", AuthMiddleware, AuthRoute)

app.listen(PORT, () => {
    console.log('server running successfully ', + PORT)
})