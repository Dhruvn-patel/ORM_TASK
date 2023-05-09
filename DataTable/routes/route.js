const express = require('express');
const router = express.Router();

    const { showDataController, userController, addDataController } = require('../controller/usercontroller')
const { oneToneControlller, oneToManyController } = require('../controller/datatablecontroller')


router.get('/', userController);

/**
 * @swagger
 * /addData:
 *  post:
 *     tags:
 *       -  Add data with faker package
 *     descriptions: Add data into Users,Employees,Photos table
 *     responses:
 *        '200':
 *          description: A data added Successfully
 *        '404':
 *          description: error occur to insert data
 */


router.post('/addData', addDataController);
router.get('/gettwoData', oneToManyController);

/**
 * @swagger
 * /showData:
 *  get:
 *    tags:
 *      - User details   
 *    description: show initial Data
 *    responses:
 *       '200':
 *         description:  A Successfull response
 *         content:
             application/json:
 * 
 * 
 * 
 */

router.get('/showData', showDataController);
router.get('/getData', oneToneControlller);



module.exports = router;