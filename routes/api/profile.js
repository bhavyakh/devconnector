const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

const validateRInput = require('../../validation/profile')

//Load profile model
const Profile = require('../../models/Profile')
// load user model
const User = require('../../models/User');

// @route GET api/profiles/test
// @desc Test
// @access Public
router.get('/test',(req,res)=> res.json({
    msg : "Profile"
}));

// @route GET api/profiles/
// @desc Shows the user profle
// @access Private
router.get('/', passport.authenticate('jwt',{session : false}), (req,res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(!profile ) {
                errors.noprofile = 'There is no profile'
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch((err ) => res.status(404).json(err))
});

// @route api/profile/
// @desc Add profile
// @access Private
router.post('/',passport.authenticate('jwt',{session : false}) , (req,res) => {

    const { errors, isValid } = validateRInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }
        const profileField = {};
        profileField.user = req.user.id;
        if(req.body.handle) profileField.handle = req.body.handle;
        if(req.body.company) profileField.company = req.body.company;
        if(req.body.website) profileField.website = req.body.website;
        if(req.body.location) profileField.location = req.body.handle;
        if(req.body.status) profileField.status = req.body.status;
        
        if(req.body.bio) profileField.bio = req.body.bio;
        if(req.body.githubUsername) profileField.githubUsername = req.body.githubUsername;
        
        if(typeof req.body.skills !== 'undefined'){
            profileField.skills = req.body.skills.split(',');            
        }

        profileField.social = {};
        if(req.body.youtube) profileField.social.youtube = req.body.youtube;
        if(req.body.instagram) profileField.social.instagram = req.body.instagram;
        if(req.body.linkedin) profileField.social.linkedin = req.body.linkedin;
        if(req.body.facebook) profileField.social.facebook = req.body.facebook;
        if(req.body.twitter) profileField.social.twitter = req.body.twitter;

        Profile.findOne({ user : req.user.id})
            .then(profile => {
                //Updating i fprofile exists
                if(profile) {
                    Profile.findByIdAndUpdate({user : req.user.id} , {$set : profileField},{new:true})
                        .then(profile => res.json(profile)); 
                }
                else  { 

                    //Checking if handle exists
                    Profile.findOne( {handle :profileField.handle}).then(profile =>{
                        if(profile) {
                            errors.handle = "That handle already exists";
                            res.status(400).json(errors);
                        }
                        // Save profile 
                        new Profile(profileField).save()
                            .then(profile => res.json(profile))
                    })
                }
            })

})

module.exports = router;
