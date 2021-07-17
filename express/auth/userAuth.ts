import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  Mongoose from 'mongoose'
import { UserModel as User} from '../model/user'

/**
 * Register a user
 * @param {String} name
 * @param {String} email
 * @param {String} password
  */
router.post('/registerUser', (req, res, next) => {
    try {
            User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({ err: "User already exists" })
            } else {
                const newUser = new User({
                    _id: new Mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                console.log(newUser._id + newUser.name+ newUser.email);
                
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => {
                                res.status(200).json(user)
                            })
                    })
                })
            }
        })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

/**
 * Login a user
 * @param {String} email
 * @param {String} password
 */
router.post('/loginUser', async (req, res, next) => {
    const email = req.body.email
    const password= req.body.password

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ err: "Email not found" })
            }


            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email:user.email
                        
                    }
                    jwt.sign(
                        payload,
                        `${process.env.keys}`,
                        {
                            expiresIn:'3h'
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token:"Bearer "+ token
                            })
                        }
                    )
                } else {
                    return res.status(400).json({ err: "Password incorrect" })
                }
            })
        })
})

module.exports = router