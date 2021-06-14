import Show from "../models/show.js"
import Season from "../models/season.js"

//Get only the season matching url id
export const getSingleSeason = async (req,res) =>{
    const { show, seasonNumber } = req.params

    const season = await Season.findOne({show, seasonNumber}) //Is not populating for dev purposes

    //If there's no season with this query, send an error message to client
    if(!season) return res.status(400).json({"message":"Season was not found"})

    res.json(season)
}

//Get only the chapter matching url id
export const getSingleChapter = async (req,res) =>{
    const {show, seasonNumber, episodeNumber} = req.params

    //TODO - FIND CHAPTER REFERENCE
    const season = await Season.findOne({show, seasonNumber}).populate('episodes.director')

    const episode = season.episodes.find(ep => ep.episodeNumber == episodeNumber)

    //If there's no show with this ID, send an error message to client
    if(!episode) return res.status(400).json({"message":"Episode was not found"})

    res.json(episode)
}

//Add Season to Database
export const setNewSeason = async (req,res) =>{
    try {
        const {seasonNumber, episodes, imgURL} = req.body
        const { show } = req.params
        console.log(seasonNumber, show)

        //Validate ID's reference
        const showFound = await Show.findById(show)

        if(!showFound) return res.json({"message":`Invalid show ID ${show}, you need to add this show first`})

        //Create show on DB
        const newSeason = new Season({
            seasonNumber,
            show,
            imgURL,
            episodes
        })
    
        const seasonSaved = await newSeason.save()
        console.log(seasonSaved)
    
        //Add season to show seasons field
        await Show.updateOne({"_id": seasonSaved.show},{ $push: {seasons: seasonSaved._id}})
    
        res.status(201).json({"message": "Season has been added to Database"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"message": error.message})
    }
}