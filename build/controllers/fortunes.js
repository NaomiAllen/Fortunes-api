const express = require('express');
const router = express.Router();

const Fortune = require('../models/fortunes');


//Routes
//index
router.get('/', (req,res)=>{
    Fortune.find({}, (error, foundFortunes)=>{
        if (error) {
            res.status(400).json({error: error.message});
        }
        res.status(200).json(foundFortunes)
        });
    });


//post
router.post('/', (req,res)=>{
    Fortune.create(req.body, (error, createdFortune)=>{
        if(error){
            res.status(400).json({error: error.message});
        }
        res.status(200).send(createdFortune)
    })
})

//edit
router.get('/:id/edit', (req,res)=>{
    Fortune.findById(req.params.id, (err, foundFortune)=>{
            fortunes: foundFortune
            currentUser: req.session.currentUser
        })
})


//delete
router.delete('/:id', (req, res)=>{
    Fortune.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,data)=>{
        res.redirect('/fortunes')
    })
})

module.exports = router;