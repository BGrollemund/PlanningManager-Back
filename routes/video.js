const express = require( 'express' );
const router = express.Router();

const videoCtrl = require( '../controllers/video' );

router.post('/add-video', videoCtrl.create);
router.post('/add-video-category', videoCtrl.createCategory);
router.post('/get-videos', videoCtrl.readAll);
router.post('/get-video-categories', videoCtrl.readAllCategory);
router.post('/edit-video', videoCtrl.update);
router.post('/remove-video', videoCtrl.delete);
router.post('/remove-video-category', videoCtrl.deleteCategory);

module.exports = router;
