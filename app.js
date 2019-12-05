const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser');
const db = config.MONGODB_URI
const db2 = config.MONGODOCKER_URI
const user = require('./routes/users')
const accountService = require('./routes/accountServices')
const group = require('./routes/groups')
const post = require('./routes/posts')
const reply = require('./routes/replies')
const resources = require('./routes/resources')
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



app.use('/api/users', user);
app.use('/api/sessions', accountService); // Used For Login , Activation , Deactivation , Forgetting Password if needed
app.use('/api/groups', group)
app.use('/api/posts', post)
app.use('/api/replies', reply)
app.use('/api/resources', resources)




const port = config.PORT
app.listen(port, (req, res) => {
    console.log(`Server up and running on port ${port}`)
})