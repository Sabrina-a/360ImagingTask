const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
var moment = require('moment');
const app = express();
const dotenv =require('dotenv').config();

var m = moment();
//connect to mongodb database
mongoose.connect('mongodb+srv://sabrina:12345@cluster0.lpiz4.mongodb.net/myFirstDatabase',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},
()=>{
    console.log('connection to mongodb database was successful');
})
    // .then(() => console.log('connected to MongoDB...'))
    // .catch(err => console.error('Could not connect to MongoDB...', err));

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine" , 'ejs')
app.use(require('./routes/blog')) 


//routes
app.use(require('./routes/app'))
app.use(require('./routes/compose'))
app.get('/compose', (req, res) => {

    res.render('../routes/compose');
    
    });
    
app.use(require('./routes/comment'))







//server configurations are here..
const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`)
})