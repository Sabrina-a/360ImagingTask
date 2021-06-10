const router = require("express").Router();
const blog = require("../models/blogSchema");
const _ = require("lodash");
router.post("/post/:id", async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const _Blog = await blog.findOne({ _id: id });

  if (_Blog) {
    _Blog.comments.push({
      content: comment,
      commentedAt: new Date().toString(),
    });

    await _Blog.save();
    res.redirect(`/routes/blog/${id}`);
    // res.json(_Blog);
  }
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  blog
    .deleteOne({ _id: id })
    .then(() => {
      console.log("Blog deleted successfully !");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get("/routes/comment/edit/:id/:blogId", async (req, res) => {
  const { id, blogId } = req.params;

  const _blog = await blog.findOne({ _id: blogId });
  let comment = _blog.comments.find((item) => item._id == id);

  console.log("comment", { ...comment, blogId });
  res.render("../views/partials/editComment", {
    _id: comment._doc._id,
    content: comment._doc.content,
    blogId,
  });
});

router.post("/routes/comment/edit/:id/:blogId", async (req, res) => {
  const { id, blogId } = req.params;
  const { content } = req.body;
  const _blog = await blog.findOne({ _id: blogId });

  let commentIndex = _.findIndex(_blog.comments, { id });
  _blog.comments.splice(commentIndex, 1, {
    content,
    commentedAt: new Date().toString(),
  });

  await _blog.save();
  res.redirect(`/routes/blog/${blogId}`);
});

router.get("/routes/comment/delete/:id/:blogId", async (req, res) => {
  const { id, blogId } = req.params;
  const _blog = await blog.findOne({ _id: blogId });
  let commentIndex = _.findIndex(_blog.comments, { id });
  _blog.comments.splice(commentIndex, 1);

  await _blog.save();
  res.redirect(`/routes/blog/${blogId}`);
});

module.exports = router;
