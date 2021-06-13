import Movie from '../models/movie'
import Actor from '../models/actor'
import Director from '../models/director'
import Show from '../models/tvShow'

export const createDatabase = async () => {

    const initDb = {
        movies : [
            {},
            {}
        ],
        actors : [
            {},
            {}
        ],
        directors : [
            {},
            {}
        ],
        shows : [
            {},
            {}
        ],
        users : [
            {},
            {}
        ]
    }

    try {

        const count = await Movie.estimatedDocumentCount();

        if(count > 0); return

        const movies = db.movies.map(async data => {
            await new Movie(data).save()
        })
        const shows = db.shows.map(async data => {
            await new Show(data).save()
        })
        const actors = db.actors.map(async data => {
            await new Actor(data).save()
        })
        const directors = db.directors.map(async data => {
            await new Director(data).save()
        })
        const users = db.directors.map(async data => {
            await new Director(data).save()
        })

    } catch (error) {
        console.error(error)
    }

}