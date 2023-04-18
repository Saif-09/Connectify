const Post = require("../models/post.js");
const Comment = require('../models/comment.js');


//In module.exports.create, create is just the name of the function being exported
module.exports.create = async (req, res) => {
  try {
    //create() is a method of Mongoose's Model class that creates a new document (object) and saves it to the database.
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    //Here we are using ajax
    if (req.xhr){
      return res.status(200).json({
          data: {
              post: post
          },
          message: "Post created!"
      });
  }
    req.flash('success', 'Post Published!');
    return res.redirect("back");
    
  } catch (err) {
    // console.log("error in creating a post: ", err);
    req.flash('error', err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function(req, res){

  try{
      let post = await Post.findById(req.params.id);

      if (post.user == req.user.id){
          post.deleteOne();

          await Comment.deleteMany({post: req.params.id});


          if (req.xhr){
              return res.status(200).json({
                  data: {
                      post_id: req.params.id
                  },
                  message: "Post deleted"
              });
          }

          req.flash('success', 'Post and associated comments deleted!');

          return res.redirect('back');
      }else{
          req.flash('error', 'You cannot delete this post!');
          return res.redirect('back');
      }

  }catch(err){
      req.flash('error', err);
      return res.redirect('back');
  }
  
}