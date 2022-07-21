const express = require("express");
const app = express();
const path = require("path");
const router = new express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const OurModel = require("../model/Model");
const StaticPath = path.join(__dirname, "../../views/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Middleware");
router.use(express.static("public"));
app.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get("/AuthenticationPage", (req, res) => {
  res.render(StaticPath + "index.ejs", {
    message: req.flash("message") || " ",
  });
});
router.get("/HOME", auth, (req, res) => {
  res.render(StaticPath + "Home.ejs", {
    NAME: req.flash("message"),
  });
});
router.post("/", async (req, res) => {
  try {
    const register = new OurModel({
      NAME: req.body.name,
      EMAIL: req.body.email,
      PASSWORD: await bcrypt.hash(req.body.password, 4),
    });

    var findEmail = await OurModel.findOne({ EMAIL: req.body.email });
    console.log(findEmail);
    if (findEmail == null) {
      // const token = await register.generateAuthToken();
      // res.cookie("jwt", token, {
      //   expire: new Date(Date.now() + 9000000),
      //   httpOnly: true,
      // });

      req.flash("message", "Account Created Successfully");
      res.redirect("/AuthenticationPage");
      console.log("created");
      const createUser = await register.save();
    } else {
      req.flash("message", "Email already exist.");
      res.redirect("/AuthenticationPage");
    }
  } catch (err) {
    console.log("Working4");
    // console.log(err);
    res.status(401).send(error);
  }
});
router.post("/Login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const currentUser = await OurModel.findOne({ EMAIL: email });
    if (currentUser != null) {
      const PasswordResult = await bcrypt.compare(
        password,
        currentUser.PASSWORD
      );
      if (PasswordResult) {
        const token = await currentUser.generateAuthToken();
        res.cookie("jwt", token, {
          expire: new Date(Date.now() + 9000000),
          httpOnly: true,
          // secure:true
        });
        req.flash("message", await currentUser.NAME);
        res.redirect("/HOME");
      } else {
        req.flash("message", "Invalid UserEmail/Password");
        res.redirect("/AuthenticationPage");
      }
    } else {
      req.flash("message", "Invalid UserEmail/Password");
      res.redirect("/AuthenticationPage");
    }
  } catch (err) {
    res.status(401).send(error);
    // console.log(err);
  }
});
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token != req.token;
    });
    res.clearCookie("jwt");
    res.clearCookie("session-token");
    await req.user.save();
    req.flash("message", "Logout Successfully");
    res.redirect("/AuthenticationPage");
  } catch (err) {
    res.status(401).send(error);
    // console.log(err);
  }
});

module.exports = router;
