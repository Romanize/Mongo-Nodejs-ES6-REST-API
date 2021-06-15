import '../database'
import mongoose from 'mongoose'

//Importing Models
import Movie from '../models/movie'
import Actor from '../models/actor'
import Director from '../models/director'
import Show from '../models/show'
import Season from '../models/season'
import User from '../models/user'

const userData = [
    {
        username:           'Batman',
        email:              "test@gmail.com",
        password:           "123456",
    },
    {
        username:           'Superman',
        email:              "test2@gmail.com",
        password:           "1234",
    },
]

const actorsData = [
    {
        _id:                "AAAAAAAAAAAAAAAAAAAAAAAA",
        name:               "Jhonny Depp",
        gender:             "male",
        nationality:        "American",
        imgURL:             "https://static.independent.co.uk/2020/11/03/14/newFile-2.jpg",
        age:                58,
        oscars:             2,
        movies:             [],
        shows:              []
    },
    {
        _id:                "BBBBBBBBBBBBBBBBBBBBBBBB",
        name:               "Collin Farrell",
        gender:             "male",
        nationality:        "Irish",
        imgURL:             "https://static.wikia.nocookie.net/esharrypotter/images/a/a1/Colin_Farrell_perfil.jpg",
        age:                45,
        oscars:             1,
        movies:             [],
        shows:              []
    },
    {
        _id:                "CCCCCCCCCCCCCCCCCCCCCCCC",
        name:               "Keyra Knightley",
        gender:             "female",
        nationality:        "British",
        imgURL:             "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Keira_Knightley_2005.jpg/220px-Keira_Knightley_2005.jpg",
        age:                36,
        oscars:             0,
        movies:             [],
        shows:              []
    },
    {
        _id:                "DDDDDDDDDDDDDDDDDDDDDDDD",
        name:               "Mia Wasikowska",
        gender:             "female",
        nationality:        "Australian",
        imgURL:             "https://m.media-amazon.com/images/M/MV5BMTUzNzI0MDczN15BMl5BanBnXkFtZTgwNTQ0MjMxOTE@._V1_.jpg",
        age:                31,
        oscars:             0,
        movies:             [],
        shows:              []
    }
]

const directorsData = [
    {
        _id:                "111111111111111111111111",
        name:               "Gore Verbinski",
        gender:             "male",
        nationality:        "American",
        imgURL:             "https://mx.web.img3.acsta.net/pictures/16/12/20/14/40/094299.jpg",
        age:                57,
        oscars:             1,
        movies:             [],
        shows:              [],
    },
    {
        _id:                "222222222222222222222222",
        name:               "David Yates",
        gender:             "male",
        nationality:        "British",
        imgURL:             "https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/13310/13310_173x256.jpg",
        age:                57,
        oscars:             0,
        movies:             [],
        shows:              [],
    },
    {
        _id:                "333333333333333333333333",
        name:               "Tim Burton",
        gender:             "male",
        nationality:        "American",
        imgURL:             "https://upload.wikimedia.org/wikipedia/commons/1/19/Tim_Burton_Frankenweenie_2012_3.jpg",
        age:                62,
        oscars:             0,
        movies:             [],
        shows:              [],
    },
    {
        _id:                "444444444444444444444444",
        name:               "Cary Joji Fukunaga",
        gender:             "male",
        nationality:        "American",
        imgURL:             "https://upload.wikimedia.org/wikipedia/commons/8/81/Maniac_UK_premiere_%28Fukunaga%29.jpg",
        age:                43,
        oscars:             0,
        movies:             [],
        shows:              [],
    },
]

const moviesData = [
    {
        name:               "Pirates of the caribbean: The curse of the black pearl",
        director:           "111111111111111111111111", 
        actors:             ["AAAAAAAAAAAAAAAAAAAAAAAA", "CCCCCCCCCCCCCCCCCCCCCCCC"],
        imgURL:             "https://static.wikia.nocookie.net/cine/images/6/62/Piratas_del_Caribe.jpg",
        year:               2003,
        rating:             8.6
    },
    {
        name:               "Fantastic beasts and where to find them",
        director:           "222222222222222222222222", 
        actors:             ["AAAAAAAAAAAAAAAAAAAAAAAA", "BBBBBBBBBBBBBBBBBBBBBBBB"],
        imgURL:             "https://upload.wikimedia.org/wikipedia/en/5/5e/Fantastic_Beasts_and_Where_to_Find_Them_poster.png",
        year:               2016,
        rating:             7.3
    },
    {
        name:               "Alice in wonderland",
        director:           "333333333333333333333333", 
        actors:             ["AAAAAAAAAAAAAAAAAAAAAAAA",'DDDDDDDDDDDDDDDDDDDDDDDD'],
        imgURL:             "https://images-na.ssl-images-amazon.com/images/I/81FMfUBCE8L._SL1500_.jpg",
        year:               2010,
        rating:             6
    },
]

const showsData = [
    {
        _id:                "121212121212121212121212",
        name:               "True Detective",
        actors:             ["BBBBBBBBBBBBBBBBBBBBBBBB"],
        directors:          ["444444444444444444444444"],
        imgURL:             "https://images-na.ssl-images-amazon.com/images/G/01/digital/video/hero/TVSeries/true_detective_314237900_PMRS3084-SR._V350986811_SX1080_.jpg",
        year:               2014,
        rating:             0,
        seasons:            []
    }
]

const seasonData = {
    seasonNumber:       1,
    show:               "121212121212121212121212",
    imgURL:             "https://images-na.ssl-images-amazon.com/images/G/01/digital/video/hero/TVSeries/true_detective_314237900_PMRS3084-SR._V350986811_SX1080_.jpg",
    episodes:[
        {
            episodeNumber:  1,
            name:           "The long bright dark",
            rating:         9,
            director:       "444444444444444444444444",
            airedAt:        "2014-01-12"
        },
        {
            episodeNumber:  2,
            name:           "Seeing Things",
            rating:         8.9,
            director:       "444444444444444444444444",
            airedAt:        "2014-01-19"
        },

    ]
}


async function setDatabase() {

    console.log('Saving Data....')
    
    //Connecting to local db
    const myDB = mongoose.createConnection("mongodb://localhost/fakeIMDB23",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    await myDB.dropDatabase()
    
    await User.create(userData)
    await Actor.create(actorsData)
    await Director.create(directorsData)

    moviesData.forEach(async movie =>{
        const movieSaved = await Movie.create(movie)

        await Actor.updateMany({_id: movieSaved.actors},{$push:{movies: movieSaved._id}})
        await Director.updateMany({_id: movieSaved.director},{$push:{movies: movieSaved._id}})
    })

    showsData.forEach(async show =>{
        const showSaved = await Show.create(show)

        await Actor.updateMany({_id: showSaved.actors},{$push:{shows: showSaved._id}})
        await Director.updateMany({_id: showSaved.directors},{$push:{shows: showSaved._id}})
    })

    const seasonSaved = await Season.create(seasonData)
    await Show.updateOne({_id: seasonSaved.show},{$push: {seasons: seasonSaved._id}})

    console.log('Database has been saved')

}

setDatabase()
