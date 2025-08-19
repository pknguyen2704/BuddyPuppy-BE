import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { APIs_V1 } from './routes/v1/index'
import { env } from './config/environment'
import connectDB from './config/db'

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use('/v1', APIs_V1)

connectDB()

app.use(errorHandlingMiddleware)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to BuddyPuppy Backend API' })
})
app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
  console.log(`Server is running on http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`)
})
