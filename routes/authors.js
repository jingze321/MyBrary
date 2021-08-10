const express =require('express'); //get route
const router =express.Router() //set routers
const Author =require('../models/author')
const Book = require('../models/book')
const {requireAuth,checkUser} = require('../middleware/cookieJwt')

router.get('*',checkUser)


//All Authors.Route

router.get('/',requireAuth,async (req,res)=>{
    let searchOptions={}
    if (req.query.name!=null&&req.query.name!='') {//if get use query instead of body
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors ,
            searchOptions:req.query
        })

    }catch {
        res.redirect('/')
    }
})


// New Author Route
router.get('/new',requireAuth, (req, res) => {
    res.render('authors/new',{author:new Author()}) //from schema mangodb to the ejs (view file)
  })

//create Author Route
router.post('/',async (req,res)=>{
    const author = new Author({
        name : req.body.name    //need more specif can't be req.body  client may reset the PK
    })
    try{
        const newAuthor= await author.save() //add new author
        res.redirect(`authors/${author.id}`) 

    } catch {
        res.render('authors/new', {
          author: author, //prvent duplicate data
          errorMessage: 'Error creating Author'
        })

    }
    
    // const author = new Author({
    //     name : req.body.name    //need more specif can't be req.body only client may reset the PK
    // })
    // author.save((err,newAuthor)=>{
    //     if (err){
    //         res.render('authors/new'),{
    //             author:author,
    //             errorMessage:'Error creating Author'
    //         }
    //     }else{
    //         res.redirect(`authors`)
    //     }
    // })
    // res.send(req.body.name)//send data to server (npm body-parser)
}) //post for creation

router.get('/:id',requireAuth, async (req, res) => {
    // res.send('Show Author'+req.params.id) //parameter from url
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('authors/show',{ //if above both is true then
            author:author,
            booksByAuthor:books
        }) 
    }catch{
        res.redirect('/authors')
    }
})  

router.get('/:id/edit',requireAuth, async (req,res)=>{
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit',{author: author})
    }catch{
        res.redirect('/authors')
    }
})

router.put('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      author.name = req.body.name
      await author.save()
      res.redirect(`/authors/${author.id}`)
    } catch {
      if (author == null) {
          res.redirect('/')
      } else {
        res.render('authors/edit', {
          author: author,
          errorMessage: 'Error updating Author'
        })
      }
    }
})
router.delete('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      await author.remove()
      res.redirect('/authors')
    } catch {
      if (author == null) {
        res.redirect('/')
      } else {
        res.redirect(`/authors/${author.id}`)
      }
    }
  })

module.exports = router