const express = require('express');
const router = express.Router();
const { eagerController, hooksController, UserController, scopeUser, onetmanyController, onetoneProfile, manytmanyController } = require('../controllers/createUserController');
const { polyonetomany, manytomanypoly } = require('../controllers/polymorphiController');

router.get('/', UserController);
router.get('/onetonePerson', onetoneProfile);
router.get('/onetmany', onetmanyController);
router.get('/manytmany', manytmanyController);
router.get('/eager', eagerController);
router.get('/scope', scopeUser);
router.get('/hook', hooksController);
router.get('/polyonetmany', polyonetomany);
router.get('/polymanytmany', manytomanypoly);


module.exports = router;