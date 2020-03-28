const express  = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const db = 'mongodb+srv://bvyakh:@cluster0-t2ywd.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(db)
    .then(() => console.log("Connected to Mongodb ") )
    .catch((err) => console.log(err))
const app = express();

app.get('/' , (req,res) => res.send("hss"));        

//Use Routes

app.use('/api/users' , users);
app.use('/api/posts' , posts);
app.use('/api/profile' , profile);


const port = 3030;
app.listen(port , () => console.log(`Server running on port ${port}`));

