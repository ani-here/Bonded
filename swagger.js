import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Media Backend API',
      version: '1.0.0',
      description: 'API documentation for the Social Media Backend',
    },
    servers: [
        {
            url: 'https://bonded-backend.vercel.app', 
            description: 'Production server',
          },
      {
        url: 'http://localhost:3000', // Replace with your Vercel URL after deployment
        description: 'Local server',
      },
      
    ],
  },
  apis: ['./route/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};