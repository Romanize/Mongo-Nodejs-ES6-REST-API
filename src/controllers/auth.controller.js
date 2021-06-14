import User from '../models/user'
import Token from '../models/token'
import jwt from 'jsonwebtoken'
import config from '../config'

//Validate login information and (if correct) send token to frontend
export const loginUser = async ( req , res ) => {

    try {
        const { email, password } = req.body

        const userFound = await User.findOne({email})
    
        if(!userFound) return res.status(400).json({"message": "User not found"})
    
        const isPasswordOk = await User.comparePassword(password, userFound.password)
    
        if(!isPasswordOk) return res.status(401).json({"message": "Password is incorrect"})
    
        const accessToken = generateAccessToken(userFound)
        const refreshToken = jwt.sign({_id: userFound._id}, config.SECRET_REFRESH)

        const tokenLog = await new Token({
            userId: userFound._id,
            refreshToken
        })

        const saved = await tokenLog.save()
    
        res.json({"accessToken": accessToken, "refreshToken": refreshToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Server error"})
    }

}

export const refreshToken = async ( req , res ) =>{
    try {
        const { refreshToken } = req.body

        const user = jwt.verify(refreshToken, config.SECRET_REFRESH)

        const userFound = await Token.findOne({refreshToken, userId: user._id})

        if(!userFound) return res.status(403).json({"message": "Access Forbidden"})

        const accessToken = generateAccessToken(user)

        res.json({"accessToken": accessToken})
    } catch (error) {
        res.status(403).json({"message": "Access Forbidden"})
    }
}

function generateAccessToken (user) {
    return jwt.sign({id: user._id}, config.SECRET_ACCESS, {expiresIn: 1200})
}

export const logoutUser = async ( req , res ) =>{
    try {
        const { refreshToken } = req.body

        const user = jwt.verify(refreshToken, config.SECRET_REFRESH)

        const userFound = await Token.findOneAndDelete({refreshToken, userId: user._id})

        if(!userFound) return res.status(400).json({"message": "You already disconnected"}) //Token not found on DB

        res.json({"message": "You have logged out"})
    } catch (error) {
        res.status(500).json({"message": "Internal server error"})
    }
}