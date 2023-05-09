const express = require('express');
const app = express();
const route = require('./routes/route');
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerDocument = YAML.load('./apidocs/api.yaml');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Datatable Api',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3525',
          description: 'Development server',
        },
      ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  };
  
  let swaggerDocument = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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