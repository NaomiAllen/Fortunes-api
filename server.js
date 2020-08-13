const express = require ('express');
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config();
const session = require('express-session')


const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// middleware to help with the form submission
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

// mongoose connection logic
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//import fortune model
const Fortune = require('./build/models/fortunes')

//fortune controller
const fortunesController = require('./build/controllers/fortunes')
app.use('/fortunes', fortunesController)

//User Controller
const userController = require('./build/controllers/users')
app.use('/users', userController)

//session controller
const sessionsController = require('./build/controllers/sessions')
app.use('/sessions', sessionsController)


// //Put ROUTES here
app.get('/', (req, res)=>{
    res.send('new');
});

// //catch all
// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build','index.html'));
// })

app.listen(PORT, ()=> {
    console.log(`Express app running on port ${PORT}`)
});