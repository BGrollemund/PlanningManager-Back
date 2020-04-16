const express = require( 'express' );
const router = express.Router();

const adminCtrl = require( '../controllers/admin' );

const authAdmin = require('../middleware/authAdmin');

// Infos
router.post('/get-infos', authAdmin, adminCtrl.getInfos);

// Users
router.post('/create-user', authAdmin, adminCtrl.create);
router.post('/read-users', authAdmin, adminCtrl.readAll);
router.post('/update-pass', authAdmin, adminCtrl.updatePassword);
router.post('/update-role', authAdmin, adminCtrl.updateRole);
router.post('/delete-user', authAdmin, adminCtrl.delete);

module.exports = router;
