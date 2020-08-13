const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const sessionRouter = express.Router();

sessionRouter.get('/new', (req,res)=>{
    res.render('sessions/new', {currentUser: req.session.currentUser});
});

sessionRouter.post('/', (req,res)=>{
    User.findOne({ username: req.body.Username}, (err, foundUser)=>{
        if (err){
            console.log(err)
            res.send('Oops! Something went wrong')
        }else if (!foundUser){
            res.send('<a href="/fortunes/">User not found</a>')
        }else{
            if (bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUser;
                res.redirect('/fortunes');
            }else{
                res.send('<a href="/fruits">Incorrect password.</a>');
            }
        }
    });
});

sessionRouter.delete('/', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/fortunes');
    });
});

module.exports = sessionRouter;