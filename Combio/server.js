const express = require('express');
const app = express();
const route = require('./routes/route');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const PORT = 5785;


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Combo API',
    },
    servers: [
        {
            url: 'http://localhost:5785/',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        bearerAuth: []
    }],
  }; 
  
  const options = {
    swaggerDefinition,
    apis: ['./api/*.js'],
  };
  
  const swaggerres = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerres));




app.use('/', route)
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})