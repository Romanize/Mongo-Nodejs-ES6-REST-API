import express from 'express'
import morgan from 'morgan'
import moviesRoutes from './routes/movies.routes'
import actorsRoutes from './routes/actors.routes'
import authRoutes from './routes/auth.routes'

//-------------------------------SETTINGS-------------------------------//
const app = express()

//-----------------------------MIDDLEWARES-------------------------------//
app.use(morgan('dev'))
app.use(express.json())

//-------------------------------ROUTES----------------------------------//
app.use( '/', authRoutes )
app.use( '/movies', moviesRoutes )
app.use( '/actors', actorsRoutes )
// app.use( '/director', moviesRoutes )


export default app