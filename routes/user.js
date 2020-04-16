const express = require( 'express' );
const router = express.Router();

const userCtrl = require( '../controllers/user' );

const auth = require('../middleware/auth');

// Authentication
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Schedules
router.post('/add-schedule', auth, userCtrl.addSchedule);
router.post('/get-schedule', auth, userCtrl.getSchedule);
router.post('/get-schedules-infos', auth, userCtrl.getSchedulesInfos);
router.post('/remove-schedule', auth, userCtrl.removeSchedule);
router.post('/update-schedule', auth, userCtrl.updateSchedule);

module.exports = router;
