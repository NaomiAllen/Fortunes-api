const express = require ('express');
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const fortunesController = require('./build/controllers/fortunes')
const userController = require('./build/controllers/users')
const sessionsController = require('./build/controllers/sessions')
const Fortune = require('./build/models/fortunes')



require('dotenv').config();
const PORT = process.env.PORT

// middleware to help with the form submission
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
    )

const isAuthenticated = (req, res, next)=>{
    if (req.session.currentUser){
        return next();
    } else {
        res.redirect('/sessions/new');
    }
}
app.use('/fortunes', isAuthenticated);
    
    // mongoose connection logic
const mongodbURI = process.env.MONGODBURI
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});



//fortune controller
app.use('/fortunes', fortunesController)
//User Controller
app.use('/users', userController)
//session controller
app.use('/sessions', sessionsController)


// //Put ROUTES here
app.get('/', (req, res)=>{
    Fortune.find({}, (err, foundFortune)=>{
        if (err){console.log(err)}else{
            res.render('./build/views/index.ejs',{
                fortune: foundFortune,
                currentUser: req.session.currentUser,
            });
        }
    })
});



app.listen(PORT, ()=> {
    console.log(`Express app running on port ${PORT}`)
});