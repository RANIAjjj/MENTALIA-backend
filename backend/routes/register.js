const bcrypt = require("bcrypt");
const User = require('../models/user');
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
      isAdmin: Joi.boolean()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
      console.log("error in schema" + error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists.");
      console.log("user already exists")
    }

    const { name, email, password, isAdmin } = req.body;
    user = new User({ name, email, password, isAdmin });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    console.log(user + "registered successfully")
    const token = generateAuthToken(user);

    res.send(token);
    // res.json({
    //   data: user,
    //   success: true,
    //   message: "success",
    //   status: 200,
    //   token
    // })
    console.log(token)
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).send("Internal server error.");
  }
});
module.exports = router;
