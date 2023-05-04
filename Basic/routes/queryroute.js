const express = require('express');
const router = express.Router();

const { queryController, paginationController, searchController, rawqueryController, postAddController } = require('../controller/usercontroller')



router.get('/queries', queryController)
router.get('/pagination', paginationController)
router.get('/search', searchController)
router.get('/query', rawqueryController)
router.post('/postAdd', postAddController)


module.exports = router;