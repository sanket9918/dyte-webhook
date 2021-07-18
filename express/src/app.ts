import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import apiRouter from '../routes/hook'
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('../db/mongoose')
const users = require('../auth/userAuth')
const app = express()


app.use(express.json())

/**
 * Main route for the application functionalities
 */
app.use('/api', apiRouter)

/**
 * Authentication route for user
 */
app.use('/user', users)

/**
 * Error handler for unexpected errors in app
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ message: err.message })
})

const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log(`Backend server up at ${port}`);

})