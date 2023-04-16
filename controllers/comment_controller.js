const Comment = require('../models/comment.js');
const Post = require('../models/post.js')


module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      await post.save();
      res.redirect('/');
    }
  } catch (error) {
    // Handle error
    console.log(error);
  }
};
