const express = require('express');
const app = express();
const colors = require('colors');
const userrouter = require('./routes/userroute')
const queryrouter = require('./routes/queryroute')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', userrouter)
app.use('/', queryrouter)
const PORT = 4050;
// app.get('/', (req, res) => {
//     return res.status(200).send('Hello World')
// })

// app.get('/dataAdd', userAddController)
// app.get('/users', usersController)
// app.get('/users/:id', usersByIdController)
// app.delete('/users/:id', deleteUserByIdController)
// app.patch('/users/:id', patchUserByIdController)
// app.get('/getSet', getSetController)
// app.post('/users', postDataController)

// ! querys
// app.get('/queries', queryController)
// app.get('/pagination', paginationController)
// app.get('/search', searchController)
// app.get('/query', rawqueryController)
// app.post('/postAdd', postAddController)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`.yellow.underline);
})