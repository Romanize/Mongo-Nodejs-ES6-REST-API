import Movie from "../models/movie.js"
import Director from "../models/director.js"
import Show from "../models/show.js"

//Get all directos data
export const getDirectors = async (req,res) =>{
    const directors = await Director.find()
                                .populate('movies','name')
                                .populate('shows', 'name')

    res.json(directors)
}

//Get only the director matching url id
export const getSingleDirector = async (req,res) =>{
    const id = req.params.id

    const director = await Director.findById(id)

    //If there's no movie with this ID, send an error message to client
    if(!director) return res.status(400).json({"message":"A director with this ID was not found"})

    res.json(director)
}