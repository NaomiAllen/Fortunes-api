const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/users.js');

userRouter.get('/new', (req,res)=>{
    res.render('users/new.ejs')
})

userRouter.post('/',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body,(err,createdUser)=>{
        console.log('user is created', createdUser)
        res.redirect('/')
    })
})

module.exports = userRouter;