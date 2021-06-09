const router = require("express").Router()
const blog = require('../models/blogSchema')


router.get('/compose', async(req,res)=>{
    const allBlogs = await blog.find();
    console.log(allBlogs);
    res.render('../views/partials/composeBlog')
})

router.post('/compose' , (req,res)=>{
    const {title , content } =req.body;

     //check for the missing fields
     if(!title || !content)
     return res.send('Please enter all the required credentials!');

    const newBlog = new blog({title,content})

 //save blog to database
    newBlog.save()
    .then(()=>{
            console.log('blog saved successfully');
            res.redirect('/')
    })
    .catch((err)=>console.log(err))
    })

module.exports=router;