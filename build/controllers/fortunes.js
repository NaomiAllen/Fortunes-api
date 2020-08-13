const express = require('express');
const router = express.Router();

const Fortune = require('../models/fortunes');

const isAuthenticated = (req, res, next)=>{
    if (req.session.currentUser){
        return next();
    } else {
        res.redirect('/sessions/new');
    }
}

//Routes
//index
router.get('/', isAuthenticated, (req,res)=>{
    Fortune.find({}, (error, allFortunes)=>{
        res.render('index.ejs',{
            fortunes: allFortunes,
            currentUser: req.session.currentUser
        })
    })
})

//new
router.get('/new', isAuthenticated, (req,res)=>{
    res.render('new.ejs',{
        currentUser: req.session.currentUser
    });
})

//post
router.post('/', isAuthenticated, (req,res)=>{
    Fortune.create(req.body, (error, createdFortune)=>{
        res.redirect('/fortunes');
    })
})

//edit
router.get('/:id/edit', isAuthenticated, (req,res)=>{
    Fortune.findById(req.params.id, (err, foundFortune)=>{
        res.render('edit.ejs', {
            fortunes: foundFortune,
            currentUser: req.session.currentUser
        })
    })
})

//delete
router.delete('/:id', isAuthenticated, (req, res)=>{
    Fortune.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,data)=>{
        res.redirect('/fortunes')
    })
})

module.exports = router;