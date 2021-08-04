const mongoose = require('mongoose')
const path = require('path')


const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({ //table
  title: {   //JSON object
    type: String,
    required: true
  },
  description: {   //JSON object
    type: String
  },
  publishDate:{
    type:Date,
    required: true
  },
  createdAt:{
    type:Date,
    required:true,
    default:Date.now()
  },
  coverImageName:{
    type:String,
    required:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectId, //reference to other object
    required: true,
    ref:'Author'
  }

})

bookSchema.virtual('coverImagePath').get(function(){ //derive value
  if (this.coverImageName !==null){
    return path.join('/',coverImageBasePath,this.coverImageName)
  }
})

module.exports = mongoose.model('Book', bookSchema) //name,pass parameter
module.exports.coverImageBasePath = coverImageBasePath