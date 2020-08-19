const express = require('express');
const router = express.Router();

const Fortune = require('../models/fortunes');


//Routes
//index
router.get('/', (req,res)=>{
    console.log('hitting get fortunes route')
    Fortune.find({}, (error, foundFortunes)=>{
        if (error) {
            res.status(400).json({error: error.message});
        }
        res.status(200).json(foundFortunes)
        });
    });


//post
router.post('/', (req,res)=>{
    console.log(req.body)
    Fortune.create(req.body, (error, createdFortune)=>{
        if(error){
            console.log(error)
            res.status(400).json({error: error.message});
        }
        res.status(200).send(createdFortune)
    })
})

//edit
router.put('/:id', (req,res)=>{
    Fortune.findById(req.params.id, (err, foundFortune)=>{
        Fortune.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err,updatedModel)=>{
            res.redirect("/fortunes")
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