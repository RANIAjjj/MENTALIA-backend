const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000
const orders = require('./routes/orders')
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require('./routes/stripe')
const userRoute = require('./routes/userRoute')
// const meals = require("./meals");
const mealRoute = require("./routes/mealRoute")
const coachRoute = require("./routes/coachRoute")
const scheduleRoute=require('./routes/scheduleroute')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/Healthy").then(() => {
  console.log("connected to the healthy db")
}).catch((err) => {
  console.log(err)
})

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4200']
}));
// app.use(express.static('public'));
app.use("/uploads", express.static('uploads'))

// const allowedOrigin = 

app.get("/", (req, res) => {
  res.send("welcome to our shop api")
  console.log('welcome to our shop api')
})
app.use("/api/register", register);
app.use("/api/login", login);
app.use('/user', userRoute)
app.use("/api/orders", orders);
app.use("/api/stripe", stripe)
app.use('/meals', mealRoute)
app.use('/coach', coachRoute)
app.use('/schedule',scheduleRoute)

app.get("/meals", (req, res) => {
  res.send(meals);
});

app.listen(port, () => console.log(`app listens on port : ${port}`))