const express = require('express');
const router = express.Router();

const { userAddController, usersController, usersByIdController, postDataController, deleteUserByIdController, patchUserByIdController, queryController, getSetController, paginationController, searchController, rawqueryController, postAddController } = require('../controller/usercontroller')


router.get('/', (req, res) => {
    return res.status(200).send('Hello World')
})

router.get('/dataAdd', userAddController)
router.get('/users', usersController)
router.get('/users/:id', usersByIdController)
router.delete('/users/:id', deleteUserByIdController)
router.patch('/users/:id', patchUserByIdController)
router.get('/getSet', getSetController)
router.post('/users', postDataController)


module.exports = router;