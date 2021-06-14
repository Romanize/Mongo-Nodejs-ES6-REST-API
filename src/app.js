import express from 'express'
import morgan from 'morgan'
import moviesRoutes from './routes/movies.routes'
import showsRoutes from './routes/shows.routes'
import seasonsRoutes from './routes/seasons.routes'
import actorsRoutes from './routes/actors.routes'
import directorsRoutes from './routes/directors.routes'
import authRoutes from './routes/auth.routes'

//-------------------------------SETTINGS-------------------------------//
const app = express()

//-----------------------------MIDDLEWARES-------------------------------//
app.use(morgan('dev'))
app.use(express.json())

//-------------------------------ROUTES----------------------------------//
app.use( '/', authRoutes )
app.use( '/movies' , moviesRoutes )
app.use( '/actors' , actorsRoutes )
app.use( '/directors' , directorsRoutes )
app.use( '/shows' , showsRoutes )
app.use( '/shows/:showID' , seasonsRoutes )


export default app