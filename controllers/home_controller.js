const Post = require("../models/post");

module.exports.home = async (req, res)=> {
  try {
    const posts = await Post.find({}).populate('user').exec();
    return res.render("home", {
      title: "Connectify",
      posts: posts
    });
  } catch (err) {
    console.log("Error in fetching posts: ", err);
    return res.redirect("back");
  }
};
