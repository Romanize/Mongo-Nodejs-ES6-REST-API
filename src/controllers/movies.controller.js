import Movie from "../models/Movie.js"
import Actor from "../models/Actor.js"
import Director from "../models/Director.js"

//Get All movies
export const getMovies = async (req,res) =>{
    const movies = await Movie.find().populate('Director','name')

    res.json(movies)
}

//Filter movies by Query - TODO
export const getMoviesByQuery = async (req,res) =>{
    const query = req.query
    console.log(query)

    res.json('query Sent')    
}

//Filter movies by Actor
export const removeMovie = async (req,res) =>{
    try {
        const id = req.params.id

        const movieRemoved = await Movie.findByIdAndDelete(id)
        console.log(movieRemoved)

        if(!movieRemoved) return res.status(400).json({"message":"A movie with this ID was not found"})

        res.json({"message": "Movie removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}

//Filter movies by Actor
export const getSingleMovie = async (req,res) =>{
    const id = req.params.id

    const movie = await Movie.findById(id)
    res.json(movie)
}


//Add Movie to Database
export const setNewMovie = async (req,res) =>{
    try {
        const {name, director, actors, rating, imgURL, year} = req.body

        const isValidActorId = actors.map(id => id.match(/^[0-9a-fA-F]{24}$/));

        if(isValidActorId.includes(null)) return res.status(400).json({"message": "Invalid Actor"})

        const newMovie = new Movie({
            name, 
            director, 
            actors, 
            rating, 
            year, 
            imgURL
        })
    
        const movieSaved = await newMovie.save()
        console.log(movieSaved)
    
        await Actor.updateMany({"_id": movieSaved.actors},{ $push: {movies: movieSaved._id}})
        await Director.updateMany({"_id": movieSaved.director},{ $push: {movies: movieSaved._id}})
    
        res.status(201).json({"message": "Movie has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}

//Update Movie Data
export const updateMovie = async (req,res) =>{
    const id = req.params.id
    const updateFields = req.body

    const movieUpdated = await Movie.findByIdAndUpdate(id, updateFields, { new: true} )
    res.json(movieUpdated)
}