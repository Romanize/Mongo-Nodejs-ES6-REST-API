import Movie from "../models/Movie.js"

//Get All movies
export const getMovies = async (req,res) =>{
    const movies = await Movie.find()

    res.json(movies)
}

//Filter movies by Actor and/or Director
export const getMoviesByQuery = async (req,res) =>{
    const query = req.query
    console.log(query)

    res.json('query Sent')    
}

//Filter movies by Actor
export const removeMovie = async (req,res) =>{
    const id = req.params.id

    await Movie.findByIdAndDelete(id)
    res.json('Movie removed from Database')
}

//Filter movies by Actor
export const getSingleMovie = async (req,res) =>{
    const id = req.params.id

    const movie = await Movie.findById(id)
    res.json(movie)
}


//Add Movie to Database
export const setNewMovie = async (req,res) =>{
    const {name, director, actors, rating, imgURL} = req.body

    const newMovie = new Movie({name, director, actors, rating, imgURL})

    const movieSaved = await new Movie.save()
    res.json(movieSaved)
}

//Update Movie Data
export const updateMovie = async (req,res) =>{
    const id = req.params.id
    const updateFields = req.body

    const movieUpdated = await Movie.findByIdAndUpdate(id, updateFields, { new: true} )
    res.json(movieUpdated)
}