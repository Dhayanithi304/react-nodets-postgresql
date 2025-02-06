import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { responseMiddleware } from './middlewares/responseMiddleware'
import { UserRoute } from './routes/UserRoute'
import { AuthenticationMiddleware } from './middlewares/AuthenticationMiddleware'
import { AuthRoute } from './routes/AuthRoute'
import { sequelize } from './config/db'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { RoleRoute } from './routes/RoleRoute'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(responseMiddleware)

app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/role", RoleRoute)

app.use(errorMiddleware)

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, () => {
    console.log('server running successfully ', + PORT)
})