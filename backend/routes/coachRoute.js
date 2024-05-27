//coachRoutes

const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

router.post('/createCoachSchedule', coachController.createCoachSchedule);

router.get('/getUserSchedule/:userId', coachController.getUserSchedule);
//done
router.post('/subscribeToCoach', coachController.subscribeToCoach);

//done
router.post('/createCoach', coachController.createCoach);

router.delete('/deleteCoach/:id', coachController.deleteCoach);
//done
router.get('/getAllCoaches', coachController.getAllCoaches);
//done
router.post('/getAllSubscribers/:coashId',coachController.getAllSubscribers)

module.exports = router;