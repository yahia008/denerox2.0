const express = require("express")
const cors = require('cors');
require('dotenv').config()
const connectDB = require("./config/connect")
const router = require('./routes/greets')
const authRouter = require('./routes/auth')
const greet = require('./routes/greets')
const txRouter = require('./routes/transaction')
const bodyParser = require('body-parser');
const pinRoute = require('./routes/pin')
const profileRoute = require('./routes/profile')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Bank API Documentation', // Title of your API
      version: '1.0.0', // Version of your API
      description: 'API documentation for Dinero bank app',
    },
    servers: [
      {
        url: 'https://denerox2-0.onrender.com/api', // Replace with your API URL
        description: 'Development server',
      },
    ],
    components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
    }
  };
  
  // Options for Swagger docs
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your API files
  };
  
  // Initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);


const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())

connectDB()

app.use('/api', router)
app.use('/api', authRouter)
app.use('/api', txRouter)
app.use('/api', pinRoute)
app.use('/api', profileRoute)

module.exports = app