import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import apiRouter from '../routes/hook'
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('../db/mongoose')
const users = require('../auth/userAuth')
const app = express()

/**
 * The feature of verification middleware of user has been developed as a separate concern because of ambiguity of implementation according to the situation  
 */
const verify = require('../middleware/verify').verify
app.use(express.json())

app.use('/api', apiRouter)
app.use('/user', users)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ message: err.message })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Backend server up at ${port}`);

})