const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({ //table

    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },   
    name: {   //JSON object
        type: String,
        required: true
    },
    
},{ collection: 'users' })



module.exports = mongoose.model('User', UserSchema) //name,pass parameter(difine table)