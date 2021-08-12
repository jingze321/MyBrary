  if (process.env.NODE_ENV !== 'production') { //only devStart can access
    require('dotenv').config()
  }
//import library
const express = require('express');
const app =express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser'); //easy to access diffent input element from actual server
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter =require('./routes/books')
const loginRouter = require('./routes/login')
const colorRouter = require('./routes/color')




//configuring
app.set('view engine','ejs') //set view engine
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout') //set layout file location
app.use(expressLayouts)
app.use(express.static('public')) //public file js css 
app.use(bodyParser.urlencoded({ limit:'10mb',extended:false})) //can found directly from body parser (extended)
app.use(methodOverride('_method')) //able to delete and put database (get and post)
app.use(cookieParser())


const mongoose = require('mongoose');
const user = require('./models/user');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,useCreateIndex:true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/',indexRouter)
app.use('/user',loginRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)
app.use('/color',colorRouter)


app.listen(process.env.PORT || 3000) //set port 3000 default


//npm init
//npm i express ejs
//npm i save-dev nodemon dotenv (make changes while save)


//initialize just copy 2 code with push from github


//git add .
//git commit -m "project name"
//git push
//git push heroku main