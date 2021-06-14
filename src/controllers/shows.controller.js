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
                                .populate( 'seasons','seasonNumber' )

    res.json( shows )
}

//Get only the show matching url id
export const getSingleShow = async (req,res) =>{
    const id = req.params.id

    const show = await Show.findById(id)

    //If there's no show with this ID, send an error message to client
    if(!show) return res.status(400).json({"message":"A show with this ID was not found"})

    res.json(show)
}