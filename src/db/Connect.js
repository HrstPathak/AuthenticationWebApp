const mongoose = require("mongoose");
require("dotenv").config({ path: "src/.env" });
mongoose
  .connect(
    "mongodb+srv://HARSHIT:hhh123ppp@cluster0.lpc5n.mongodb.net/Authentication_PAGE?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("C O N N E C T E D");
  })
  .catch((error) => {
    console.log(error);
  });
