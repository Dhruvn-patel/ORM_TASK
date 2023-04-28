const express = require('express');
const app = express();
const colors = require('colors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const { userAddController, usersController, usersByIdController, postDataController, deleteUserByIdController, patchUserByIdController, queryController, getSetController, paginationController, searchController, rawqueryController, postAddController } = require('./controller/userController')

const PORT = 4050;
app.get('/', (req, res) => {
    return res.status(200).send('Hello World')
})

app.get('/dataAdd', userAddController)
app.get('/users', usersController)
app.get('/users/:id', usersByIdController)
app.delete('/users/:id', deleteUserByIdController)
app.patch('/users/:id', patchUserByIdController)
app.get('/getSet', getSetController)
app.post('/users', postDataController)

// ! querys
app.get('/queries', queryController)
app.get('/pagination', paginationController)
app.get('/search', searchController)
app.get('/query', rawqueryController)
app.post('/postAdd', postAddController)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`.yellow.underline);
})