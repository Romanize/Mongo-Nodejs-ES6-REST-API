import Movie from "../models/movie.js"
import Actor from "../models/actor.js"
import Show from "../models/show.js"

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
    
        newActor.save((error, document)=>{
            console.log(error)
        })
    
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
        await Movie.updateMany({"_id": actorRemoved.movies},{ $pull: {actors: actorRemoved._id}})
        await Show.updateMany({"_id": actorRemoved.shows},{ $pull: {actors: actorRemoved._id}})

        res.json({"message": "Actor removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
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