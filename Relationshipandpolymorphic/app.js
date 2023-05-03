const express = require('express');
const app = express();
const PORT = process.env.PORT || 7050;
const routes = require('./routes/createUser')
app.set('view engine', 'ejs');
// app.use(express.static())
app.use(express.json())
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})