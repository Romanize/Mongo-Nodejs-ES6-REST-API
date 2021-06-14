import Movie from "../models/movie.js"
import Actor from "../models/actor.js"
import Show from "../models/show.js"
import { getErrors } from "../database.js"

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

        if(movies.constructor === Array ){
            movies.forEach(async id => {
                const isMovieFound = await Movie.findById(id)
                if(!isMovieFound) return res.status(400).json({"message": `Movie with ID ${id} doesn't exist`})
            })
        }

        if(shows.constructor === Array ){
            shows.forEach(async id => {
                const isShowFound = await Show.findById(id)
                if(!isShowFound) return res.status(400).json({message: `Show with ID ${id} doesn't exist`})
            })
        }

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
    
        //Update Movies and Show actors field with this Actor ID
        await Movie.updateMany({"_id": actorSaved.movies},{ $push: {actors: actorSaved._id}})
        await Show.updateMany({"_id": actorSaved.shows},{ $push: {actors: actorSaved._id}})
    
        res.status(201).json({"message": "Actor has been added to Database"})
    } catch (error) {
        res.status(400).json({"message": error.message})
    }
}

//Get only the actor matching url id
export const getSingleActor = async (req,res) =>{
    const id = req.params.id

    const actor = await Actor.findById(id)

    //If there's no movie with this ID, send an error message to client
    if(!actor) return res.status(400).json({"message":"An actor with this ID was not found"})

    res.json(actor)
}