const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')


//input validation 
const validateRInput = require('../../validation/register');

// load model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Test
// @access Public
router.get('/test',(req,res)=> res.json({
    msg : "User"
}));

//@route POST api/users/register
//@desc Register User
//@access Public
router.post('/register', (req,res) => {
    const { errors, isValid } = validateRInput(req.body);

    if(!isValid) {
        console.log("ye khul raha hai") 
        return res.status(400).json(errors);
    }
    User.findOne({email : req.body.email})
    .then(user => {
        if(user) {
            error.email = 'Email Already Exists'
            return res.status(400).json(errors);
        }
        else {
            const newUs = new User({
                name : req.body.name,
                email : req.body.email,
                avatar : "https://i.pinimg.com/originals/7b/b2/ae/7bb2ae1130a3fae6fdb4bf4b834fe43e.jpg",
                password : req.body.password
            });
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUs.password, salt , (err,hash) => {
                    if(err) throw err;
                    newUs.password = hash;
                    newUs.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err)); 
                })
            })
        }
    })
});

// @route api/users/login
// @desc Login User / returns jwt token
// @access Public
router.post('/login' , (req,res)=> {
    const email = req.body.email;
    const password  = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            
            bcrypt.compare(password,user.password)
                .then(hua =>{
                        if(hua){
                            //Generate Token
                            
                            const payload = {
                                id : user.id,
                                name : user.name,
                                avatar : user.avatar
                            }
                            jwt.sign(payload , "mykey" , {expiresIn : 3600 } , (err,token) => {
                                res.json({
                                    success : true,
                                    token : 'Bearer ' + token
                                })
                            });
                        }
                        else{
                            err.password ='Incorrect'
                            return res.status(404).json(errors)
                        }
                    })
        })
})


// @route GET api/users/current
// @desc Return Current User
// @access Private
router.get('/current' , passport.authenticate('jwt' , {session : false }) , (req,res ) => {
    res.json(req.user)
})


module.exports = router;
