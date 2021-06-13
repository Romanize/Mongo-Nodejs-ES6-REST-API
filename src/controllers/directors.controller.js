import Movie from "../models/movie.js"
import Director from "../models/director.js"
import Show from "../models/shows.js"

//Get all directos data
export const getDirectors = async (req,res) =>{
    const directors = await Director.find()
                                .populate('movies','name')
                                .populate('shows', 'name')

    res.json(directors)
}

//Create new Director on DB
export const setNewDirector = async (req,res) =>{
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

        const newDirector = new Director({
            name, 
            gender, 
            nationality, 
            age, 
            oscars,
            shows,
            imgURL,
            movies
        })
    
        const directorSaved = await new Director.save()
    
        //Update Movies and Show directors field with this Director ID
        await Movie.updateMany({"_id": directorSaved.movies},{ director: directorSaved._id})
        await Show.updateMany({"_id": directorSaved.shows},{ director: directorSaved._id})
    
        res.status(201).json({"message": "Director has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}

//Remove director from db
export const removeDirector = async (req,res) =>{
    try {
        const id = req.params.id

        const directorRemoved = await Director.findByIdAndDelete(id)

        if(!directorRemoved) return res.status(400).json({"message":`An director with ID ${id} was not found`})

        //Remove this director from movies and shows fields
        await Movie.updateMany({"_id": directorSaved.movies},{ $pull: {directors: directorSaved._id}})
        await Show.updateMany({"_id": directorSaved.shows},{ $pull: {directors: directorSaved._id}})

        res.json({"message": "Director removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}