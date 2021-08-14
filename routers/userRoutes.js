const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const becrypt = require("bcrypt");

//Register the user

router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    //validation

    if (!email || !password || !confirmPassword) {
      res.send("Enter all the fields");
    }

    // check if the email is already registered.
    const userExists = await User.findOne({
      email: email,
    });

    //if no, put it in mongodb
    if (userExists) {
      res.send("User already exists");
    }

    const newUser = new User({ email, password });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.TOKEN_PASSWORD
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send("cookie sent");
    // you'll get the response. With that response, sign a token and attach that ID with the payload of the token
    // setCookie send it back to the client
  } catch (err) {
    console.log(err);
  }
});

//log in user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("Enter both fields");
  }

  const userExists = await User.findOne({
    email,
  });

  if (!userExists) {
    res.send("Can't find account");
  }

  const token = jwt.sign(
    { userId: userExists._id },
    process.env.TOKEN_PASSWORD
  );

  res.cookie("token", token).send("token sent");
});

router.get("/isLoggedIn", (req, res) => {
  res.send("hey there");
});

module.exports = router;
