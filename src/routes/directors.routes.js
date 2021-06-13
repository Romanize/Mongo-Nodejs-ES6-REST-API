import {Router} from 'express'
import * as directorController from '../controllers/directors.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

router.get("/",directorController.getDirectors)
router.post("/",verifyToken,directorController.setNewDirector)
// router.get("/search",auth.registerUser)
// router.get("/:id",auth.loginUser)
router.delete("/:id",verifyToken,directorController.removeDirector)

export default router