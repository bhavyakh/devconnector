const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//db key to be stored seperately
const db = 'mongodb+srv://bhavyakh:bhavyakh@cluster0-t2ywd.mongodb.net/test?retryWrites=true&w=majority'

//estabilishes connection with database
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log("Connected to Mongodb ") )
    .catch((err) => console.log(err))

//starts app
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize());

//Passport config 
require('./config/passport.js')(passport)

//app at /
app.get('/' , (req,res) => res.send("hss"));        

//Use Routes
app.use('/api/users' , users);
app.use('/api/posts' , posts);
app.use('/api/profile' , profile);

//starting here
const port = 3030;
app.listen(port , () => console.log(`Server running on port ${port}`));

