const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    User.findOne({email : req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email : 'Email Already Exists'});
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
                return res.status(404).json({email : "user not found"});
            }
            
            bcrypt.compare(password,user.password)
                .then(hua =>{
                        if(hua){
                            //Generate Token
                            console.log("ok1")
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
                            return res.status(404).json({email : "password doesnt match"})
                        }
                    })
        })
})

module.exports = router;
