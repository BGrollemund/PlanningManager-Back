const express = require( 'express' );
const router = express.Router();

// const auth = require('../middleware/auth');

const scheduleCtrl = require( '../controllers/schedule' );

// add middleware
// router.post('/', auth, scheduleCtrl.create);

router.post( '/', scheduleCtrl.create );
router.get( '/', scheduleCtrl.readAll );
router.get( '/:id', scheduleCtrl.readOne );
router.put( '/:id', scheduleCtrl.update );
router.delete( '/:id', scheduleCtrl.delete );

module.exports = router;
