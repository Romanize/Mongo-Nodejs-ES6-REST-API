import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

//Save a new user and send token to front
export const registerUser = async ( req , res ) =>{
    try {
        const { username , email , password } = req.body;

        const usernameFound = await User.findOne({username})
        if(usernameFound) return res.status(403).json({"message": "Username has been taken"})

        const emailFound = await User.findOne({email})
        if(emailFound) return res.status(403).json({"message": "email has been taken"})
        
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
        
        const savedUser = await newUser.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET_ACCESS, {expiresIn: 1000})
        
        res.json({ "token" : token })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({"message": "Server error"})
    }
}

//Validate login informatio and (if correct) send token to frontend
export const loginUser = async ( req , res ) => {

    try {
        const { email, password } = req.body
        const userFound = await User.findOne({email})
    
        if(!userFound) return res.status(404).json({"message": "User not found"})
    
        const isPasswordOk = await User.comparePassword(password, userFound.password)
    
        if(!isPasswordOk) return res.status(401).json({"message": "Password is incorrect"})
    
        const accessToken = jwt.sign({id: userFound._id}, config.SECRET_ACCESS, {expiresIn: 15})
        const refreshToken = jwt.sign({id: userFound._id}, config.SECRET_REFRESH)
    
        res.json({"accessToken": accessToken, "refreshToken": refreshToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Server error"})
    }

}

export const logoutUser = async ( req , res ) =>{
    res.json( 'logout' )
}