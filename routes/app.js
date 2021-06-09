const router = require('express').Router();
const blog = require('../models/blogSchema')



router.get('/', async(req,res)=>{

    const allBlogs = await blog.find();
    console.log(allBlogs);

res.render('index',{ blogs : allBlogs });
})

module.exports = router;