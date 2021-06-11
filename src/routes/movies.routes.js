import {Router} from 'express'
import * as moviesController from '../controllers/movies.controller'

const router = Router()

//Get all the movies on DB
router.get('/', moviesController.getMovies)

//Filter movies by Actor and/or Director
router.get('/search', moviesController.getMoviesByQuery)

//Add Movie to Database
router.post('/', moviesController.setNewMovie)

//Remove Movie from Database
router.delete('/:id', moviesController.removeMovie)

//Get just one Movie from Database
router.get('/:id', moviesController.getSingleMovie)

//Update Movie Data
router.put('/:id', moviesController.updateMovie)

export default router