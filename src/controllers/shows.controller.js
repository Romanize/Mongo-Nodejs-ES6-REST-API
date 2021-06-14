import Show from "../models/show.js"
import Actor from "../models/actor.js"
import Director from "../models/director.js"
import Season from "../models/season.js"

//Get All shows
export const getShows = async ( req , res ) =>{

    //Get shows and populate data based on actors and director id
    const shows = await Show.find()
                                .populate( 'actors' , 'name' )
                                .populate( 'directors' , 'name' )
                                .populate( 'seasons' )

    res.json( shows )
}

//Remove show from db
export const removeShow = async (req,res) =>{
    try {
        const id = req.params.id

        const showRemoved = await Show.findByIdAndDelete(id)

        //Validate show ID before server response
        if(!showRemoved) return res.status(400).json({"message":"A show with this ID was not found"})

        //Remove this show from any actor and Director list
        await Actor.updateMany({"_id": showRemoved.actors},{ $pull: {shows: showRemoved._id}})
        await Director.updateMany({"_id": showRemoved.directors},{ $pull: {shows: showRemoved._id}})

        //Remove reference inside seasons
        await Season.find({"_id": showRemoved.seasons}).remove()

        res.json({"message": "Show removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}

//Get only the show matching url id
export const getSingleShow = async (req,res) =>{
    const id = req.params.id

    const show = await Show.findById(id)

    //If there's no show with this ID, send an error message to client
    if(!show) return res.status(400).json({"message":"A show with this ID was not found"})

    res.json(show)
}

//Add Show to Database
export const setNewShow = async (req,res) =>{
    try {
        const {name, actors, rating, imgURL, year} = req.body

        //Validate ID's reference
        actors.forEach(id => {
            const actor = Actor.findById(id)

            if(!actor) return res.json({"message":`Invalid actor ID ${id}, you need to add this actor first`})
        });

        directors.forEach(id => {
            const director = Director.findById(id)

            if(!director) return res.json({"message":`Invalid director ID ${id}, you need to add this director first`})
        });

        //Create show on DB
        const newShow = new Show({
            name, 
            actors, 
            rating,
            directors,
            year, 
            imgURL
        })
    
        const showSaved = await newShow.save()
    
        //Add show to actors and director fields
        await Actor.updateMany({"_id": showSaved.actors},{ $push: {shows: showSaved._id}})
        await Director.updateMany({"_id": showSaved.director},{ $push: {shows: showSaved._id}})
    
        res.status(201).json({"message": "Show has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}