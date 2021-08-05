const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({ //table
  name: {   //JSON object
    type: String,
    required: true
  }
})

authorSchema.pre('remove',function(next){ //prevent author has book before delete
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) {
      next(new Error('This author has books still'))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Author', authorSchema) //name,pass parameter(difine table)