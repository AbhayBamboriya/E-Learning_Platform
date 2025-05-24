import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
// import userRoutes from './Routes/userRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import errorMiddleware from './middleware/error.middleware.js';
const app = express()
import doubtRoutes from './Controller/Doubtcontroller.js';

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3483', // Or process.env.FRONTEND_URL if set correctly
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Optional: handle preflight requests explicitly
app.options('*', cors());

// for parsing to json data directly
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))        //it will extract out the query params from url
app.use(morgan('dev'))  //morgan will track all the access point or to which url the request made at localhost and it will print it in terminal 

// cookie parser is udes to get the directly token which is used in isLoggedin method used in auth middleware
// for parsing the token
app.use(cookieParser()) //by using cookie parrser token can be extracted easily that is used in auth.middleware.js
// app.use(exp)

app.use('/ping', function (req, res) {
    res.send('/pong')
})

app.use('/api', userRoutes)
app.use('/doubts', doubtRoutes)

app.all('*', (req, res) => {
    res.status(404).send('OOPS!!! 404 page not found')
})

// error will be send to user
app.use(errorMiddleware)

export default app