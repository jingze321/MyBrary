const express =require('express'); //get route
const router =express.Router() //set routers
const Author =require('../models/author')

//All Authors.Route

router.get('/',async (req,res)=>{
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

    }catch{
        res.redirect('/')
    }
})


// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new',{author:new Author()})
  })

//create Author Route
router.post('/',async (req,res)=>{
    const author = new Author({
        name : req.body.name    //need more specif can't be req.body only client may reset the PK
    })
    try{
        const newAuthor= await author.save()
        res.redirect(`authors`)

    } catch {
        res.render('authors/new', {
          author: author,
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


module.exports = router