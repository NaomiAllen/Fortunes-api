const express = require('express');
const router = express.Router();

const Fortune = require('../models/fortunes');


//Routes
//index
router.get('/', (req,res)=>{
    Fortune.find({}, (error, foundFortunes)=>{
        res.render('../views/index.ejs', {
            fortunes: foundFortunes,
            currentUser: req.session.currentUser
        })
    })
})

//new
router.get('/new', (req,res)=>{
    res.render('../views/fortunes/new.ejs',{
        currentUser: req.session.currentUser
    });
})

//post
router.post('/', (req,res)=>{
    Fortune.create(req.body, (error, createdFortune)=>{
        res.redirect('/fortunes');
    })
})

//edit
router.get('/:id/edit', (req,res)=>{
    Fortune.findById(req.params.id, (err, foundFortune)=>{
        res.render('../views/fortunes/edit.ejs', {
            fortunes: foundFortune,
            currentUser: req.session.currentUser
        })
    })
})

//delete
router.delete('/:id', (req, res)=>{
    Fortune.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,data)=>{
        res.redirect('/fortunes')
    })
})

module.exports = router;