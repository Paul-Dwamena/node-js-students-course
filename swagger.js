const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library',
    description: 'Description'
  },
  host: 'node-js-students-course.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['./new_app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);