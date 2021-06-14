import {Router} from 'express'
import * as moviesController from '../controllers/movies.controller'
import { verifyToken } from "../middlewares/auth.jwt"

const router = Router()

//Get all the movies on DB
router.get('/', moviesController.getMovies)

//Filter movies by Actor and/or Director
router.get('/search', moviesController.getMoviesByQuery)

//Get just one Movie from Database
router.get('/:id', moviesController.getSingleMovie)

export default router