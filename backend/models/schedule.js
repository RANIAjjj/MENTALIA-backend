const mongoose = require('mongoose');
const scheduleSchema=mongoose.Schema({
    userId: { type: String, required: true },
 dayName:{
type:String,
required:true,
 },
    details:{
        type:Array,
        hour:{
            type:String,
            required:true,
        },
        activity:{
            type:String,
            required:true,
        },
        done:{
            type:Boolean,
            default:false
        }
    }
})
const Schedule = mongoose.model("Schedule", scheduleSchema);
Schedule.createIndexes({ dayName: 1 });
module.exports = Schedule;