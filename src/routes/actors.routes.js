import {Router} from 'express'
import * as actorController from '../controllers/actors.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

//Get all actors reference
router.get("/",actorController.getActors)

//Set new Actor
router.post("/",verifyToken,actorController.setNewActor)

//Get single actor reference
router.get("/:id",actorController.getSingleActor)

export default router