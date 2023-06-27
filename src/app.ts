import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { AuthRouter } from './routes/auth.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
import { PropertyRouter } from './routes/property.route'
import { UploadRouter } from './routes/upload.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// ROUTES
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/property', PropertyRouter)
app.use('/upload', UploadRouter)

// Global error handler
app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
export default app
