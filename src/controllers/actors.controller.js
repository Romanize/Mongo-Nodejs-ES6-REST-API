import Movie from "../models/movie.js"
import Actor from "../models/actor.js"
import Show from "../models/shows.js"

//Get all actors data
export const getActors = async (req,res) =>{
    const actors = await Actor.find()
                                .populate('movies','name')
                                .populate('shows', 'name')

    res.json(actors)
}

//Create new Actor on DB
export const setNewActor = async (req,res) =>{
    try {
        const {name, gender, nationality, age, imgURL, oscars, movies, shows} = req.body

        //Validate movies and shows ID
        movies.forEach(id => {
            const isMovieFound = Movie.findById(id)
            if(!isMovieFound) return res.status(400).json({"message": `The movie with ${id} is invalid`})
        });
        shows.forEach(id => {
            const isShowFound = Show.findById(id)
            if(!isMovieFound) return res.status(400).json({"message": `The show with ${id} is invalid`})
        });

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
    
        const actorSaved = await new Actor.save()
    
        //Update Movies and Show actors field with this Actor ID
        await Movie.updateMany({"_id": actorSaved.movies},{ $push: {actors: actorSaved._id}})
        await Show.updateMany({"_id": actorSaved.shows},{ $push: {actors: actorSaved._id}})
    
        res.status(201).json({"message": "Actor has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}

//Remove actor from db
export const removeActor = async (req,res) =>{
    try {
        const id = req.params.id

        const actorRemoved = await Actor.findByIdAndDelete(id)

        if(!actorRemoved) return res.status(400).json({"message":`An actor with ID ${id} was not found`})

        //Remove this actor from movies and shows fields
        await Movie.updateMany({"_id": actorSaved.movies},{ $pull: {actors: actorSaved._id}})
        await Show.updateMany({"_id": actorSaved.shows},{ $pull: {actors: actorSaved._id}})

        res.json({"message": "Actor removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}