const express = require ('express');
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')




require('dotenv').config();
const PORT = process.env.PORT
// console.log("console log 1")



// middleware to help with the form submission
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
// console.log('console log 2')

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
    )


// console.log('console log 3')
// const isAuthenticated = (req, res, next)=>{
//     if (req.session.currentUser){
//         return next();
//     } else {
//         res.redirect('/sessions/new');
//     }
// }
// app.use('/fortunes', isAuthenticated);
    
    // mongoose connection logic
const mongodbURI = process.env.MONGODBURI
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

const fortunesController = require('./build/controllers/fortunes')
const userController = require('./build/controllers/users')
const sessionsController = require('./build/controllers/sessions')

//fortune controller

app.use('/fortunes', fortunesController)
//User Controller
console.log("about to use user controller")
app.use('/users', userController)
//session controller
console.log("about to use session controller")
app.use('/sessions', sessionsController)





app.listen(PORT, ()=> {
    console.log(`Express app running on port ${PORT}`)
});