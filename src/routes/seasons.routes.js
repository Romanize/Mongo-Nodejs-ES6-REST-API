import {Router} from 'express'
import * as seasonsController from '../controllers/seasons.controller'
import { verifyToken } from '../middlewares/auth.jwt'

const router = Router()

//Get single season
router.get('/:seasonNumber', seasonsController.getSingleSeason)

//Get single chapter
router.get('/:chapterNumber', seasonsController.getSingleSeason)

//Add Season to Database
router.post('/', verifyToken, seasonsController.setNewSeason)

//Remove Season from Database
router.delete('/:id', verifyToken, seasonsController.removeSeason)

export default router