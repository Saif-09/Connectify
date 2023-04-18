const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

module.exports.create = function(req, res){
  Post.findById(req.body.post)
  .then(function(post){
      if (post){
          return Comment.create({
              content: req.body.content,
              post: req.body.post,
              user: req.user._id
          })
          .then(function(comment){
              post.comments.push(comment);
              return post.save();
          })
          .then(function(){
              return res.redirect('/');
          })
          .catch(function(err){
              console.log(err);
              return res.redirect('back');
          });
      }
  })
  .catch(function(err){
      console.log(err);
      return res.redirect('back');
  });
}

module.exports.destroy = function(req, res){
  Comment.findById(req.params.id)
  .then(function(comment){
      if (comment.user == req.user.id){

          let postId = comment.post;

          comment.remove();

          Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
          .then(function(post){
              return res.redirect('back');
          })
          .catch(function(err){
              console.log(err);
              return res.redirect('back');
          });
      }else{
          return res.redirect('back');
      }
  })
  .catch(function(err){
      console.log(err);
      return res.redirect('back');
  });
}
