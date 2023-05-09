const express = require('express');
const router = express.Router();
const joi=require('joi');
const { eagerController, hooksController, UserController, scopeUser, onetmanyController, onetoneProfile, manytmanyController } = require('../controllers/createusercontroller');
const { polyonetomany, manytomanypoly } = require('../controllers/polymorphicontroller');
let {validatemiddlware}=require('../middlewares/validation.middleware');

// const validatemiddlware =async (req,res,next) => {

//     const schema = joi.object().keys({
//         FirstName: joi.string().required,
//         LastName:joi.string().required,
//         email:joi.string().email().required,
//         address:joi.string().required,
//         contactNumber:joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required().messages({
//             'number.min': 'Mobile number should be 10 digit.',
//             'number.max': 'Mobile number should be 10 digit'
//         })
//     })

//     const {error}=schema.validate(req.body);
//     if(error)
//     {
//         return res.status(404).json({error})
//     }
//     else
//     {
//         next()
//         return res.status(200).json({msg: 'Success validate request'})
//     }
// }

router.get('/', UserController);
router.get('/onetonePerson', onetoneProfile);


router.get('/onetmany', validatemiddlware,onetmanyController);
router.get('/manytmany', manytmanyController);
router.get('/eager', eagerController);
router.get('/scope', scopeUser);
router.get('/hook', hooksController);
router.get('/polyonetmany', polyonetomany);
router.get('/polymanytmany', manytomanypoly);


module.exports = router;