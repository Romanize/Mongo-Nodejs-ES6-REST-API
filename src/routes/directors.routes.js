import {Router} from 'express'
import * as directorController from '../controllers/directors.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

//Get all directors
router.get("/",directorController.getDirectors)

//Get single director reference
router.get("/:id",directorController.getSingleDirector)

export default router