const Post = require("../models/post");

//In module.exports.create, create is just the name of the function being exported
module.exports.create = async (req, res) => {
  try {
    //create() is a method of Mongoose's Model class that creates a new document (object) and saves it to the database.
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("error in creating a post: ", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }).then(() => {
        res.redirect("back");
      });
    } else {
      res.redirect("back");
    }
  } catch (err) {
    console.log("error in deleting a post: ", err);
    res.redirect("back");
  }
};
