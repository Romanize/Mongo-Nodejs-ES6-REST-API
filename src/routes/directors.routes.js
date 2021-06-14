import {Router} from 'express'
import * as directorController from '../controllers/directors.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

//Get all directors
router.get("/",directorController.getDirectors)

//Add director to DB
router.post("/",verifyToken,directorController.setNewDirector)

//Get single director reference
router.get("/:id",directorController.getSingleDirector)

//Remove director from DB
router.delete("/:id",verifyToken,directorController.removeDirector)

export default router