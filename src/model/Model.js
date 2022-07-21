const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validation = require("validator");
const OurSchema = new mongoose.Schema({
  NAME: {
    type: String,
    require: true,
  },
  EMAIL: {
    type: String,
    require: true,
    unique: true,
  },
  PASSWORD: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});
OurSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};
const OurModel = new mongoose.model("LoginUser", OurSchema);

module.exports = OurModel;
