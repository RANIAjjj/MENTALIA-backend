const User = require("../models/user");
const scheduleController= require('../controllers/schedulecontroller')
const express = require('express');
const route = express.Router();
const OpenAi = require('openai');

require("dotenv").config();

const { auth } = require("../middleware/auth");
const openai = new OpenAi({
    apiKey : process.env.OPEN_AI_KEY // from another account
})
route.post('/addSchedule/:id',async(req, res)=>{
    try{
        let userId = req.params.id
            const {age ,gender,position,work,physical,food,sleep,streetslevel,water,screens,smoke,day}= req.body
            const question =`basid on this inputs make me a schedule for health care routine:my age ${age} 
    ,I'm  ${gender} ,i am  ${position} , i work ${work} hours everyday,my level of physical activity is ${physical},
    i am  ${food}, i sleep usually ${sleep} hours a day,
   ,my stress levels on a scale of 1 to 10 is ${streetslevel},
    i only drink ${water} glasses of water a day ,i spent ${screens} hours on screens,
    i ${smoke}smoke ? make me a schedule for ${day} ,i need more detail in each hour from wake up to sleep and format this answer with json file like this format 
   {dayName: string ,details:{ {hour: number} ,{activity:string},{done:false}`
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": question }],
        max_tokens: 3550,
    })
    let result= response.choices[0].message.content
    let results=JSON.parse(result);
    // console.log(results);        
    let {dayName,details}=results
    let data= await scheduleController.createOneDaySchedule(userId,dayName,details)
    res.status(200).send(data);
// }
       }catch(e){
         res.send(e)
       }
})
route.post('/getalldays/:id',async(req, res)=>{
    try{
    let userId = req.params.id
    let data= await scheduleController.getAllDaysforUser(userId)
    res.status(200).send(data);
// }
       }catch(e){
          console.log(e);
       }
})
route.delete('/delete/:userId/:scheduleId',async(req,res)=>{
    try{
        let userId = req.params.userId
        let scheduleId = req.params.scheduleId
        let data= await scheduleController.DeleteDay(userId,scheduleId)
        res.status(200).send(data);
    }catch(e){
        console.log(e);
    }
})
route.patch('/checked/:scheduleId/:hour',async(req,res)=>{
     try{
       let id = req.params.scheduleId
       let hour = req.params.hour
       console.log(id);
       let data = await scheduleController.updateChecked(id,hour)
    res.send(data , " was update successfully")
     }catch(e){
        console.log(e);
     }
})
module.exports=route