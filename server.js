  if (process.env.NODE_ENV !== 'production') { //only devStart can access
    require('dotenv').config()
  }
//import library
const express = require('express');
const app =express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser'); //easy to access diffent input element from actual server
const methodOverride = require('method-override');


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter =require('./routes/books')


//configuring
app.set('view engine','ejs') //set view engine
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout') //set layout file location
app.use(expressLayouts)
app.use(express.static('public')) //public file js css 
app.use(bodyParser.urlencoded({ limit:'10mb',extended:false})) //can found directly from body parser (extended)
app.use(methodOverride('_method')) //able to delete and put database (get and post)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)



app.listen(process.env.PORT || 3000) //set port 3000 default


//initialize just copy 2 code with push from github

//git add .
//git commit -m "project name"
//git push
//git push heroku main