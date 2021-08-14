const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//setting up server
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and is listening on port ${PORT}`);
});

//parsing incoming json into object
app.use(express.json());

//connecting to mongodb
mongoose.connect(
  process.env.MONGO_STR,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB is connected");
    }
  }
);

app.get("/home", (req, res) => {
  res.send("This is the home page");
});

app.use("/auth", require("./routers/userRoutes"));
