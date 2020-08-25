const express = require('express');
const router = express.Router();
const Fortune = require('../models/fortunes');


router.get('/', (req,res)=>{
    console.log('collection page')
    Fortune.find({}, (error, foundFortunes)=>{
        if (error) {
            res.status(400).json({error: error.message});
        }
        res.status(200).json(foundFortunes)
        });
    });

//delete
router.delete('/:id', (req, res)=>{
    Fortune.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err,data)=>{
        res.redirect('/fortunes')
    })
})

module.exports = router;

