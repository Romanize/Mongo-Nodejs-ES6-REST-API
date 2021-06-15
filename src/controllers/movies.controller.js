import Movie from "../models/movie.js"
import Actor from "../models/actor.js"
import Director from "../models/director.js"
import { isValidObjectId } from "mongoose"

//Get All movies
export const getMovies = async ( req , res ) =>{

    //Get movies and populate data based on actors and director id
    const movies = await Movie.find()
                                .populate( 'actors' , 'name' )
                                .populate( 'director' , 'name' )

    res.json( movies )
}

//Filter movies by Query - TODO
export const getMoviesByQuery = async ( req , res ) =>{
    try {
        const query = req.query
        //List of parameters included on movie schema
        const validParams = ["sort","order","name","year","rating","actors","director"]

        for(const key in query){

            //Validate parameters included in the list of possibilities
            if(!validParams.includes(key)) {
                return res.json({"message":`The parameter ${key} is not supported for the API`})
            }

            //If there is a sort parameter, do search based on query
            if (key == "sort") {

                const sortBy = query.sort
                const order = query.order
                query.name = new RegExp(`${query.name}`, "i")

                //remove not filterable parameters
                delete query["sort"]
                delete query["order"]
                console.log(query)
                
                //Look for movies and sort based on query
                const movies = await Movie.find(query)
                                        .sort([[sortBy, order]])
                                        .populate('director actors','name')
                return res.json(movies)
            }
        }

        //Delete order parameter if sort is not present
        delete query["order"]

        //Look for movies based on query
        const movies = await Movie.find(query)
    
        res.json(movies)    
    } catch (error) {
        res.status(400).json({"message": "An error ocurred while filtering movies, please check parameters and try again"})
    }
}


//Get only the movie matching url id
export const getSingleMovie = async (req,res) =>{
    const id = req.params.id

    const movie = await Movie.findById(id)

    //If there's no movie with this ID, send an error message to client
    if(!movie) return res.status(400).json({"message":"A movie with this ID was not found"})

    res.json(movie)
}
