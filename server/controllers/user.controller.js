const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAccount = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    return res.json({
      error: false,
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { user: { _id: user._id, name: user.name, email: user.email } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "36000m",
      }
    );

    return res.json({
      error: false,
      msg: "Login Successful",
      email,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  const { user } = req.user;

  try {
    const foundUser = await User.findById(user._id);
    if (!foundUser) {
      return res.sendStatus(404);
    }

    return res.json({
      user: {
        name: foundUser.name,
        email: foundUser.email,
        age: foundUser.age,
        photo:foundUser.photo,
        _id: user._id,
      },
      msg: "",
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
