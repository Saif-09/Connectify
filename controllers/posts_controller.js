const Post = require("../models/post");

//In module.exports.create, create is just the name of the function being exported
module.exports.create = async (req, res)=> {
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
