import {Router} from 'express'
import * as showsController from '../controllers/shows.controller'
import { verifyToken } from '../middlewares/auth.jwt'

const router = Router()

//Get all the shows on DB
router.get('/', showsController.getShows)

//Add Show to Database
router.post('/', verifyToken, showsController.setNewShow)

//Remove Show from Database
router.delete('/:id', verifyToken, showsController.removeShow)

//Get just one Show from Database
router.get('/:id', showsController.getSingleShow)

export default router