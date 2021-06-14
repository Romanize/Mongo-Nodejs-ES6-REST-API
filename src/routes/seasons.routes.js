import {Router} from 'express'
import * as seasonsController from '../controllers/seasons.controller'
import { verifyToken } from '../middlewares/auth.jwt'

const router = Router()

//Get single season
router.get('/:show/:seasonNumber', seasonsController.getSingleSeason)

//Get single chapter
router.get('/:show/:seasonNumber/:episodeNumber', seasonsController.getSingleChapter)

//Add Season to Database
router.post('/:show', verifyToken, seasonsController.setNewSeason)

export default router