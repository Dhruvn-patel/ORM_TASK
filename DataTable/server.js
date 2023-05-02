const express = require('express');
const app = express();
const route = require('./Routes/route');
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const corsOptions = {
    // origin: 'http://localhost:3525',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + './views'))
app.use(express.static('./public'))
const PORT = 3525;
app.use('/', route)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})