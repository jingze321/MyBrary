const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const {requireAuth,checkUser} = require('../middleware/cookieJwt')


const JWT_SECRET =process.env.SECRET

const bcrypt = require('bcrypt')

router.get('*',checkUser)


router.get('/',async (req,res)=>{
    res.cookie('token','',{maxAge: 1})

    res.render('users/index',{name:'kyle'})

    
})

router.get('/register',async (req,res)=>{
    res.cookie('token','',{maxAge: 1})


    res.render('users/register')

    
})

router.post('/',async (req,res)=>{

	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return (console.log("Error1"))
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET,
            {expiresIn:"1h"}
		)
        res.cookie('token',token, { httpOnly: true , secure: true, maxAge: 3600000})
        //

        return res.redirect("/")

	}else{
        return res.status(400).json('Password Incorrect')

    }
    
})
//create register Route
router.post('/register',async (req,res)=>{
    const { email, password: plainTextPassword,name } = req.body

	if (!email || typeof email !== 'string') {
       
        return (console.log('e must more than 6'))

        
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        
        return (console.log('e must more than 6'))
        
	}

	if (plainTextPassword.length < 5) {
		
        return (console.log('password must more than 6'))
        
	}

    const password = await bcrypt.hash(plainTextPassword, 10)
    // const user = new User({
    //     id:Date.now().toString(),
    //     email : req.body.email,
    //     password : hashpassword,
    //     name:req.body.name, 
    // })
    try{
        // const newUser= await user.save() //add new author
        const response = await User.create({
            email,
			password,
            name

        })
        // console.log(response)

        res.redirect('/user')

    } catch (error) {
        if (error.code === 11000){
            res.redirect('/user')
        }else {
            res.render('authors/edit', {
              author: author,
            })
          }

    }
    
    console.log('error'+errorMessage)
}) 

router.get('/edit',requireAuth, (req,res)=>res.render('users/edit'))

router.get('/logout',requireAuth, (req,res)=>{
    res.cookie('token','',{maxAge: 1})
    res.redirect('/user')
})



    
    
    



module.exports = router