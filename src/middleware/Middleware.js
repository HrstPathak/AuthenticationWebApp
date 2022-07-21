const jwt = require("jsonwebtoken");
const OurModel = require("../model/Model");
const auth = async (req, res, next) => {
  try {
    console.log("MIDDLEWARE WORKIG");
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await OurModel.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).send(error);
  }
};
module.exports = auth;
