const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: process.env.HOST || 'localhost:3300',
  definitions: {
    Spell: {
      type: 'object',       // <-- specify it’s an object
      required: ['index', 'name', 'level', 'url'], // <-- required fields
      properties: {         // <-- describe each property’s type
        index: { type: 'string', example: 'acid-arrow-two' },
        name: { type: 'string', example: 'Acid Arrow Two' },
        level: { type: 'integer', example: 2 },
        url: { type: 'string', example: "api/spells/acid-arrow-two" }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/spells.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);