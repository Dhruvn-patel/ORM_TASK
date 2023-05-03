const express = require('express');
const app = express();
const route = require('./routes/route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.use(express.static(__dirname + './views'))
app.use(express.static('./public'))


const PORT = 3525;
app.use('/', route)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})