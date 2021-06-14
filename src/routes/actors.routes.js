import {Router} from 'express'
import * as actorController from '../controllers/actors.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

//Get all actors reference
router.get("/",actorController.getActors)

//Set new Actor
router.post("/",verifyToken,actorController.setNewActor)

// router.get("/search",auth.registerUser)

//Get single actor reference
router.get("/:id",actorController.getSingleActor)

//Remove actor from DB
router.delete("/:id",verifyToken,actorController.removeActor)

export default router