const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchem = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    handle : {
        type : String,
        required : true,
        max : 40
    },
    company : {
        type : String 
    },
    website : {
        type : String 
    },
    location : {
        type : String, 
         
    },    
    status : {
        type : String, 
        required : true 
    },
    skills : {
        type :[String],
        required : true
    },
    bio : {
        type:String
    },
    githubUsername : {
        type:String
    },
    experience : 
        {
            title : {
                type: String,
                required : false
            },
            company : {
                type : String,
                required : false
            },
            location : {
                type : String
            },
            from : {
                type : Date
            },
            to : {
                type : Date
            }
        }
    ,
    education : 
        {
            school : {
                type: String,
                required : false
            },
            degree : {
                type : String,
                required : false
            },
            field : {
                type : String
            },
            from : {
                type : Date
            },
            to : {
                type : Date
            }
        }
    ,social : {
        youtube : {
            type: String
        },
        linkedin : {
            type: String
        },
        twitter  : {
            type: String
        },
        instagram : {
            type: String
        },
        facebook : {
            type: String
        }
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchem  )