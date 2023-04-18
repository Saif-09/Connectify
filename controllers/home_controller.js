const Post = require("../models/post");
const User = require("../models/users.js");

module.exports.home = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec();
    const users = await User.find({}).exec();
    return res.render("home", {
      title: "Connectify",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error in fetching posts: ", err);
    return res.redirect("back");
  }
};
