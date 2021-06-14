import {Router} from 'express'
import * as auth from '../controllers/auth.controller'

const router = Router()

//Route for getting auth tokens, need to provide email and password
router.post("/login",auth.loginUser)

//Refresh access token route
router.post("/refreshToken",auth.refreshToken)

//Delete refresh token from db
router.delete("/logout",auth.logoutUser)

export default router