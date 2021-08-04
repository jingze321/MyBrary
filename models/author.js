const mongoose =require('mongoose');

const authoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        //above is common things to setup with schema 
    }
})

module.exports = mongoose.model('Author',authoSchema)