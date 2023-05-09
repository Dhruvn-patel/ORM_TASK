const express = require('express');
const router=express.Router();
const { deleteDataController, generateComboController,displayController ,updateController,dataFieldsController} = require('../controller/generatecombo')
const {selectValidate,showValidate} =require('../middleware/combovalidate')
router.post('/',selectValidate,generateComboController)
router.get('/show',showValidate,displayController)
router.put('/update/:id',updateController)
router.get('/typeData',dataFieldsController)
router.delete('/deleteData/:id',deleteDataController)
module.exports =router;
