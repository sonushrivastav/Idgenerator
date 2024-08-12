const UserIdCard = require("../models/userIdCard.model");
const User = require("../models/user.model");

exports.createUserIdCard = async (req, res) => {
  try {
    const { userId, name, age, photo } = req.body;
    console.log("backedn", photo, name, age);

    if (!photo) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const userIdCard = new UserIdCard({
      user: userId,
      name,
      photo,
      age,
    });

    await userIdCard.save();

    await User.findByIdAndUpdate(userId, { idCard: userIdCard._id });

    res
      .status(201)
      .json({ message: "User ID card created successfully", userIdCard });
  } catch (error) {
    console.error("Error creating User ID card:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserIdCardByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdCard = await UserIdCard.findOne({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!userIdCard) {
      return res.status(404).json({ message: "User ID card not found" });
    }

    res.status(200).send(userIdCard.photo);
  } catch (error) {
    console.error("Error fetching User ID card:", error);
    res.status(500).json({ message: "Server error" });
  }
};
