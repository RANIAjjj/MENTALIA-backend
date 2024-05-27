//coashSchModel
const mongoose = require("mongoose");
const coachSchSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        coachId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach'
        },
        details: {
            ex: String,
            dinner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal'
            },
            lunch: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal'
            }
        }
    },
    { timestamps: true }
);



const CoachSch = mongoose.model("CoachSch", coachSchSchema);


module.exports = CoachSch;