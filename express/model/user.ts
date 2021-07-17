import mongoose from 'mongoose'
import { prop, addModelToTypegoose, buildSchema } from '@typegoose/typegoose'

class User {
    @prop()
    public name!: string;
    @prop()
    public email!: string;
    @prop()
    public password!: string
}
const userSchema = buildSchema(User);
export const UserModel = addModelToTypegoose(mongoose.model('User', userSchema), User)