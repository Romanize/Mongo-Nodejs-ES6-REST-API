import {Router} from 'express'
import * as auth from '../controllers/auth.controller'

const router = Router()

router.post("/register",auth.registerUser)
// router.post("/login",auth.login)
router.post("/logout",auth.logoutUser)

export default router