const router = require("express").Router()
const blog = require('../models/blogSchema')
router.get('/routes/blog/:id', async(req,res)=>{
    const {id} = req.params;
    const getBlog = await blog.findOne({_id : id})

    res.render('../views/partials/particularBlog' , {blog : getBlog})

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
    const getData = await blog.findOne({_id : id});
    res.render('../views/partials/editBlog',{blog : getData});
})

.post('/edit/:id',(req , res)=>{
    const {id} = req.params;
    const {title , content } = req.body;
    blog.updateOne({_id : id },{title , content})
    .then(()=>{
        console.log('Updated Successfully!');
        res.redirect('/');
    })
    .catch((err)=>console.log(err));
})
module.exports = router;