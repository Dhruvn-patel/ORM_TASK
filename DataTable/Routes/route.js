const express = require('express');
const router = express.Router();

const {jqueryDataController, UserController, addDataController, paginationController } = require('../Controller/userController')

router.get('/', UserController);
router.post('/addData', addDataController);
router.get('/pagination', paginationController);
router.get('/getData', jqueryDataController);


module.exports = router;