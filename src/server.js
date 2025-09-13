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

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to BuddyPuppy Backend API' })
})

// 👇 Chỗ quan trọng
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || env.LOCAL_DEV_APP_PORT || 3000

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`)
})
