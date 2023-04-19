const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Email or password is not correct",
      });
    }
    return res.json(200, {
      message: "Signin Successful, here your token",
      data: {
        //This line will generate a JSON WEB TOKEN
        token: jwt.sign(user.toJSON(), "connectify", { expiresIn: "100000" }),
      },
    });
  } catch {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
