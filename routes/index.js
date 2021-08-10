const express = require('express')
const router = express.Router()
const Book =require('../models/book')
const {requireAuth,checkUser} = require('../middleware/cookieJwt')


router.get('/',requireAuth,checkUser, async (req, res) => {
  let books
  try{
    books =await Book.find().sort({createdAt:'desc'}).limit(10).exec() //execute

  }catch{
    books=[]
  }
  res.render('index',{books:books})

})

module.exports = router