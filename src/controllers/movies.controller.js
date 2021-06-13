import Movie from "../models/Movie.js"
import Actor from "../models/Actor.js"
import Director from "../models/Director.js"

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

                //remove not filterable parameters
                delete query["sort"]
                delete query["order"]
                
                //Look for movies and sort based on query
                const movies = await Movie.find(query).sort([[sortBy, order]])
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

//Remove movie from db
export const removeMovie = async (req,res) =>{
    try {
        const id = req.params.id

        const movieRemoved = await Movie.findByIdAndDelete(id)

        //Validate movie ID before server response
        if(!movieRemoved) return res.status(400).json({"message":"A movie with this ID was not found"})

        //Remove this movie from any actor and director list
        await Actor.updateMany({"_id": movieRemoved.actors},{ $pull: {movies: movieRemoved._id}})
        await Director.updateMany({"_id": movieRemoved.director},{ $pull: {movies: movieRemoved._id}})

        res.json({"message": "Movie removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
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

//Add Movie to Database
export const setNewMovie = async (req,res) =>{
    try {
        const {name, director, actors, rating, imgURL, year} = req.body

        //Validate ID's reference
        actors.forEach(id => {
            const actor = Actor.findById(id)

            if(!actor) return res.json({"message":`Invalid actor ID ${id}, you need to add this actor first`})
        });

        const isDirectorFound = Director.findById(director)
        if(!isDirectorFound) return res.json({"message":`Invalid director ID ${id}, you need to add this director first`})

        //Create movie on DB
        const newMovie = new Movie({
            name, 
            director, 
            actors, 
            rating, 
            year, 
            imgURL
        })
    
        const movieSaved = await newMovie.save()
    
        //Add movie to actors and director fields
        await Actor.updateMany({"_id": movieSaved.actors},{ $push: {movies: movieSaved._id}})
        await Director.updateMany({"_id": movieSaved.director},{ $push: {movies: movieSaved._id}})
    
        res.status(201).json({"message": "Movie has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}