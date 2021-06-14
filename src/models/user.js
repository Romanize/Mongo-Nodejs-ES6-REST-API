import { Schema , model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema ({
    username:           {type:String,unique: [true, 'username missing']},
    email:              {type:String,unique: [true, 'email missing']},
    password:           {type:String,required: [true, 'Password missing']},
})

userSchema.statics.encryptPassword = async ( password ) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async ( password , receivedPassword ) => {
    return await bcrypt.compare( password , receivedPassword )
}

export default model( 'User' , userSchema )