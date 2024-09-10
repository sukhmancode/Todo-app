import express from 'express'
import connectDb from './db/Todo'
const app = express()
import rootRouter from './routes/index'
import cors from 'cors'

connectDb()
app.use(cors())
app.use(express.json())
app.use("/api/v1",rootRouter)
app.listen(5000)