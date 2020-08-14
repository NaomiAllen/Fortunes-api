const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/users.js');

//new
userRouter.get('/new', (req,res)=>{
    res.render('users/new.ejs')
})

//create
userRouter.post('/',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body,(err,createdUser)=>{
        if (err){
            console.log(err)
        }else{
            console.log('user is created', createdUser);
            res.render('../views/sessions/new.ejs',{
            currentUser: createdUser
        })
        }
    });
});


module.exports = userRouter;