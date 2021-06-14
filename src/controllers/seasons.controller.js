import Show from "../models/show.js"
import Director from "../models/director.js"
import Season from "../models/season.js"

//Remove season from db
export const removeSeason = async (req,res) =>{
    try {
        const {id} = req.params.id

        const seasonRemoved = await Season.findByIdAndDelete(id)

        //Validate show ID before server response
        if(!seasonRemoved) return res.status(400).json({"message":"A season with this ID was not found"})

        //Remove this show from any actor and director list
        await Show.updateMany({"seasons": seasonRemoved.show},{ $pull: {seasons: seasonRemoved._id}})

        res.json({"message": "Season removed from Database"})
    } catch (error) {
        res.status(500).json({"message":"Internal server error"})
    }
}

//Get only the season matching url id
export const getSingleSeason = async (req,res) =>{
    const { showID, seasonNumber } = req.params

    const season = await Season.find({show: showID, seasonNumber})

    //If there's no season with this query, send an error message to client
    if(!season) return res.status(400).json({"message":"Season was not found"})

    res.json(season)
}

//Get only the chapter matching url id
export const getSingleChapter = async (req,res) =>{
    const {showID, seasonNumber, chapterNumber} = req.params

    //TODO - FIND CHAPTER REFERENCE
    const chapter = await Season.find({show: showID, seasonNumber})
    console.log(chapter)

    //If there's no show with this ID, send an error message to client
    if(!chapter) return res.status(400).json({"message":"Chapter was not found"})

    res.json(chapter)
}

//Add Season to Database
export const setNewSeason = async (req,res) =>{
    try {
        const {seasonNumber, show, chapters, imgURL} = req.body

        //Validate ID's reference
        const showFound = Show.findById(id)

        if(!showFound) return res.json({"message":`Invalid show ID ${id}, you need to add this show first`})

        //Create show on DB
        const newSeason = new Season({
            seasonNumber, 
            show, 
            chapters, 
            imgURL
        })
    
        const seasonSaved = await newSeason.save()
    
        //Add season to show seasons field
        await Show.updateOne({"_id": seasonSaved.show},{ $push: {shows: seasonSaved._id}})
        // await Director.updateMany({"_id": Saved.director},{ $push: {shows: showSaved._id}})
    
        res.status(201).json({"message": "Show has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message": "Internal server error, please try again later"})
    }
}