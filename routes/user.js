const express = require( 'express' );
const router = express.Router();

const userCtrl = require( '../controllers/user' );

const auth = require('../middleware/auth');

router.get('/', userCtrl.readAll);
router.get('/:id', userCtrl.readOne);

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.post('/add-schedule', auth, userCtrl.addSchedule);
router.post('/get-schedule', auth, userCtrl.getSchedule);
router.post('/get-schedules-infos', auth, userCtrl.getSchedulesInfos);
router.post('/remove-schedule', auth, userCtrl.removeSchedule);
router.post('/update-schedule', auth, userCtrl.updateSchedule);

router.delete('/:id', userCtrl.delete);

module.exports = router;
