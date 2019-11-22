const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser');
const db = config.MONGODB_URI
const user = require('./routes/users')
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



app.use('/users', user);




const port = config.PORT
app.listen(port, (req, res) => {
    console.log(`Server up and running on port ${port}`)
})
