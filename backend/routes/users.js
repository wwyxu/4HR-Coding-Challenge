const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/userModel");

// Register User
router.post("/register", async (req, res) => {
  const { email, name, password, password2 } = req.body;

  try {
    // Return if any fields are empty
    if (!email || !name || !password || !password2) {
      return res.status(401).json("Please fill in all the fields");
    }

    // Return if Passwords do not match
    if (password !== password2) {
      return res.status(401).json("Passwords must match");
    }

    // Check if user exists
    const userCount = await User.find({ email: email })
      .limit(1)
      .countDocuments();

    if (userCount > 0) {
      return res.status(401).json("User already exists!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: bcryptPassword,
    });

    // Save User to database
    await newUser.save();
    return res.json("success");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Return if any fields are empty
    if (!email || !password) {
      return res.status(401).json("Please fill in all the fields");
    }

    // Find User from Database and Authenticate
    const loginUser = await User.findOne({ email: email });

    const validPassword = await bcrypt.compare(password, loginUser.password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials");
    }

    const jwtToken = jwtGenerator(loginUser._id);
    return res.json({ jwtToken });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Verify User
router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Current User
router.get("/currentuser", async (req, res) => {
  const token = req.header("jwt_token");

  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  try {
    const verify = jwt.verify(token, "secret");

    const currentUser = await User.findOne({ _id: verify.user.id });

    res.json(currentUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Current User
router.put("/updateprofile", async (req, res) => {
  const { name, delivery, billing, home, work, mobile } = req.body;
  const token = req.header("jwt_token");

  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  console.log(req.body);

  try {
    const verify = jwt.verify(token, "secret");

    console.log(verify.user.id);

    const filter = { _id: verify.user.id };

    const options = { upsert: true };

    const updateProfile = {
      $set: {
        name: name,
        address: {
          delivery: delivery,
          billing: billing,
        },
        phone: {
          work: work,
          home: home,
          mobile: mobile,
        },
      },
    };

    await User.updateOne(filter, updateProfile, options);

    return res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
