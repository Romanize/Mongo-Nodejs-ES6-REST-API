import Movie from "../models/Movie.js"
import Actor from "../models/Actor.js"
import Director from "../models/Director.js"

//Get All actors
export const getDirectors = async (req,res) =>{
    const directors = await Actor.find().populate('movies','name')

    res.json(directors)
}

export const setNewDirector = async (req,res) =>{
    try {
        const {name, gender, nationality, age, imgURL, oscars, movies, shows} = req.body

        const isValidMovieId = movies.map(id => id.match(/^[0-9a-fA-F]{24}$/));

        if(isValidMovieId.includes(null)) return res.status(400).json({"message": "Invalid Actor"})

        const newActor = new Actor({
            name, 
            gender, 
            nationality, 
            age, 
            oscars,
            shows,
            imgURL,
            movies
        })
    
        const actorSaved = await newActor.save()
        console.log(actorSaved)
    
        await Movie.updateMany({"_id": actorSaved.movies},{ $push: {actors: actorSaved._id}})
        // await Director.updateMany({"_id": movieSaved.director},{ $push: {movies: movieSaved._id}})
    
        res.status(201).json({"message": "Actor has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}

//Remove actor from db -- TODO
export const removeActor = async (req,res) =>{
    try {
        const id = req.params.id

        const actorRemoved = await Actor.findByIdAndDelete(id)
        console.log(actorRemoved)

        if(!actorRemoved) return res.status(400).json({"message":"An actor with this ID was not found"})

        res.json({"message": "Actor removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}