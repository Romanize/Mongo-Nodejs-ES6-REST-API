import jwt from 'jsonwebtoken'
import config from '../config'

//Verify access token expiration
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]

        if(!token) res.status(403).json({"message": "No token provided"})
    
        const verified = jwt.verify(token,config.SECRET_ACCESS)
        
        req.uid = verified.id //In case we need to use id on next function

        next()
    } catch (error) {
        res.status(403).json({"message": "Your session has expired"})
    }
}