
const Coach = require('../models/coachModel');
let User = require("../models/user")
let Meal = require("../models/meal")
let CoachSch = require("../models/coachSchModel")
const bcrypt = require('bcrypt')
//1-createCoach
const multer = require('multer');
const path = require("path")

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads"))
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
})
const upload = multer({ storage: Storage });

exports.createCoach = async (req, res) => {
  try {
    upload.single("imageFile")(req, res, async (err) =>{
      if (err) {
        return res.status(400).json({ message: 'File upload failed' });
      }
      const { name, email, password,description , isAdmin } = req.body;
      const imageFile = req.file ? "http://localhost:3000/uploads/" + req.file.filename : ''; 
      const newCoach = new Coach({ name, email, password,description, imageFile ,isAdmin });
      const savedCoach = await newCoach.save();
      res.json(savedCoach);

    })
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//2-deleteCoach
exports.deleteCoach = async (req, res) => {
    try {
        const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
        if (!deletedCoach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        res.json({ message: 'Coach deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//3-getAllCoaches
exports.getAllCoaches = async (req, res) => {
    try {
        const coaches = await Coach.find();
        console.log(coaches)
        res.json(coaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//4-sub=> params{userId,coachId} then push the ids 
exports.subscribeToCoach = async (req, res) => {
    try {
        const { userId, coachId } = req.body;
        if (!userId || !coachId) {
            return res.status(400).json({ message: 'User ID and Coach ID are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the coach exists
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        // Check if the user is already subscribed to the coach
        if (coach.subscribe.includes(userId)) {
            return res.status(400).send( 'User already subscribed to this coach');
        }
        // Subscribe the user to the coach
        coach.subscribe.push(userId);
        await coach.save();
        res.json({ message: 'User subscribed to coach successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//5-createCoachSch=> body{userId,coachId,lunch.dinner,Exercises}
exports.createCoachSchedule = async (req, res) => {
    try {
        const { userId, coachId, lunch, dinner, ex } = req.body;
        console.log(ex);
        // Check if user, coach, lunch meal, and dinner meal exist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        const lunchMeal = await Meal.findById(lunch);
        if (!lunchMeal) {
            return res.status(404).json({ message: 'Lunch meal not found' });
        }
        const dinnerMeal = await Meal.findById(dinner);
        if (!dinnerMeal) {
            return res.status(404).json({ message: 'Dinner meal not found' });
        }
        // Create coach schedule record
        const newCoachSchedule = new CoachSch({
            userId,
            coachId,
            details: {
                lunch: lunchMeal._id,
                dinner: dinnerMeal._id,
                ex: ex
            }
        });
        const savedCoachSchedule = await newCoachSchedule.save();

        res.json(savedCoachSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//6-getUserSch by userId
exports.getUserSchedule = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find coach schedules for the given user ID
        const userSchedule = await CoachSch.find({ userId }).populate('coachId').populate('details.lunch').populate('details.dinner');
        res.json(userSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllSubscribers = async (req, res) => {
    try {
        const coachId = req.params.coashId;
        console.log(coachId);
        const coach = await Coach.findById(coachId).populate('subscribe');
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        const subscribers = coach.subscribe;
        res.status(200).json({ subscribers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
