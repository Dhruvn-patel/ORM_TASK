const express = require('express');
const router = express.Router();

const { showDataController, jqueryDataController, UserController, addDataController, paginationController } = require('../Controller/userController')

router.get('/', UserController);
router.post('/addData', addDataController);
router.get('/gettwoData', paginationController);
router.get('/getData', jqueryDataController);
router.get('/showData', showDataController);


module.exports = router;