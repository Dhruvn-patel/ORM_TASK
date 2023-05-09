const express = require('express');
const app = express();
const PORT = process.env.PORT || 7050;
const bodyParser = require('body-parser');
const routes = require('./routes/createuser')
app.set('view engine', 'ejs');

bodyParser.urlencoded({ extended: false})
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})