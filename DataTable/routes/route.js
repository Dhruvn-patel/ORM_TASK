const express = require('express');
const router = express.Router();

const { showDataController, userController, addDataController } = require('../controller/usercontroller')
const { oneToneControlller, oneToManyController } = require('../controller/datatablecontroller')
router.get('/', userController);
router.post('/addData', addDataController);
router.get('/gettwoData', oneToManyController);
router.get('/getData', oneToneControlller);
router.get('/showData', showDataController);

module.exports = router;