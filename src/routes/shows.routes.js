import {Router} from 'express'
import * as showsController from '../controllers/shows.controller'
import { verifyToken } from '../middlewares/auth.jwt'

const router = Router()

//Get all the shows on DB
router.get('/', showsController.getShows)

//Get just one Show from Database
router.get('/:id', showsController.getSingleShow)

export default router