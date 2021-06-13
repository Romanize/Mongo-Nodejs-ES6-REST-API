import {Router} from 'express'
import * as actorController from '../controllers/actors.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

router.get("/",actorController.getActors)
router.post("/",verifyToken,actorController.setNewActor)
// router.get("/search",auth.registerUser)
// router.get("/:id",auth.loginUser)
router.delete("/:id",verifyToken,actorController.removeActor)

export default router