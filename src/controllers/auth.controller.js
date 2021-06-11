import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

export const registerUser = async ( req , res ) =>{
        const { username , email , password } = req.body;
        console.log('HERE')
        
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
        
        const savedUser = await newUser.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET, {expiresIn: 7200})
        
        res.json(token)
}

export const logoutUser = async ( req , res ) =>{
    res.json('logout')
}