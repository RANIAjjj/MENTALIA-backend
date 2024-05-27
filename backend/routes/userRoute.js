const userController = require('../controllers/userController')
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt')

route.get('/getallusers', async (req, res) => {
    try {

        let data = await userController.getAllUsers()
        // console.log(data);
        res.status(200).send(data);
        // }
    } catch (e) {
        console.log(e);
    }
})
route.get('/getuser/:id', async (req, res) => {
    try {
        let Id = req.params.id
        let data = await userController.getUserById(Id)
        // console.log(data);
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
    }
})
route.delete('/delete/:userId', async (req, res) => {
    try {
        let userId = req.params.userId
        let data = await userController.DeleteUser(userId)
        res.status(200).send("this user was deleted");
    } catch (e) {
        console.log(e);
    }
})
route.patch('/edit/:userId', async (req, res) => {
    try {
        let userId = req.params.userId
        let { name, email, password, isAdmin } = req.body

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        let data = await userController.updateUser(userId, name, email, hashedpassword, isAdmin)

        // console.log(req.body);
        // console.log(data);
        res.send(data + " this user was updated")
    } catch (e) {
        console.log(e);
    }
})
module.exports = route