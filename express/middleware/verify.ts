import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

/**
Helper function to help verify the status of the user authentication
 */
function verify(req: Request, res: Response, next: NextFunction) {
    if (req.body.token == null) res.status(401).json({ err: "Token not present" })
    jwt.verify(req.body.token, `${process.env.keys}`, (err: VerifyErrors | null, data: object | undefined) => {
        if (err) {
            console.log("Its my error")
            next(err)
        }
        else next()
    })
}
module.exports = { verify }
