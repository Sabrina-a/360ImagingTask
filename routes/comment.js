const router = require("express").Router()
const blog = require('../models/blogSchema')
router.post('/post/:id', async(req,res)=>{
    const {id } = req.params;
    const {comment} = req.body;
    const _Blog = await blog.findOne({_id : id})
 console.log(req);
  if(_Blog){
      _Blog.comments.push({content : comment , commentedAt : new Date().toString()})

      await _Blog.save();
     res.redirect(`/routes/blog/${id}`)
        // res.json(_Blog);
  }

});


router.get('/delete/:id', (req,res)=>{
    const {id} = req.params ; 
    blog.deleteOne({_id : id})
    .then(()=>{
        console.log("Blog deleted successfully !")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

router.get('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    const getData = await blog.comments.findOne({_id : id});
    res.render('../views/partials/editComment',{blog : getData});
})

router.post('/edit/:id',(req , res)=>{
    const {id} = req.params;
    const { content } = req.body;
    blog.comments.updateOne({_id : id },{title , content})
    .then(()=>{
        console.log('Updated Successfully!');
        console.log(blog.comments);
        res.redirect('/');
    })
    .catch((err)=>console.log(err));
})
module.exports = router;