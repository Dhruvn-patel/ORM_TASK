const express = require('express');
const app = express();
const colors = require('colors');
const userrouter = require('./routes/userroute')
const queryrouter = require('./routes/queryroute')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Basic Querys',
            version: '1.0.0',
        },
        servers:[
            {url:'http://localhost:4050'}
        ]
    },
    apis: ['./routes/userroute.js'],
};
let swaggerDocument = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/', userrouter)
app.use('/', queryrouter)
const PORT = 4050;




app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`.yellow.underline);
})  