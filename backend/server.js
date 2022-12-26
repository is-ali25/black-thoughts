const mongoose = require('mongoose')
const Thought = require('./models/Thought')
const express = require('express')
const cors = require('cors')
require('body-parser')
require('dotenv').config()
// const path = require(path)

//initiate server
const app = express()
const port = process.env.PORT || 5000

// if (process.env.NODE_DEV === 'production') {
//     app.use(express.static('client/build'))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

//middleware
app.use(cors())
app.use(express.json())

// //connect to database
const URL = process.env.DB_CONNECTION
mongoose.connect(URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {console.log('successfully connected to MongoDB database')})

//routes
app.get('/', async (req, res) => {
    try {
        const Thoughts = await Thought.find()
        res.status(200).json(Thoughts)
        console.log("successful get request")
        // res.send("Hello World")
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

app.post('/add', async (req, res) => {
    console.log("request has been received")
    const newThought = new Thought(req.body)
    try {
        await newThought.save()
        console.log('successful post request')
        res.status(201).json(newThought)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//start server
app.listen(port, () => console.log(`server is listening on port ${port}`))