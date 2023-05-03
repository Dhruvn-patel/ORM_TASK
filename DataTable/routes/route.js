const express = require('express');
const router = express.Router();

const { showDataController, userController, addDataController } = require('../controller/userController')
const {oneToneControlller,oneToManyController}=require('../controller/dataTableController')
router.get('/', userController);
router.post('/addData', addDataController);
router.get('/gettwoData', oneToManyController);
router.get('/getData', oneToneControlller);
router.get('/showData', showDataController);


module.exports = router;