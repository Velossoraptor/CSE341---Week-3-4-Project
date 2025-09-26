const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: process.env.HOST || 'localhost:3300',
  definitions: {
    Spell: {
      type: 'object',
      required: ['index', 'name', 'level', 'url'],
      properties: {
        index: { type: 'string', example: 'acid-arrow-two' },
        name: { type: 'string', example: 'Acid Arrow Two' },
        level: { type: 'integer', example: 2 },
        url: { type: 'string', example: "api/spells/acid-arrow-two" }
      }
    },
    Class: {
      type: 'object',
      required: ['index', 'name', 'description', 'subclasses', 'apiUrl', 'sourceBook', 'url'],
      properties: {
        index: { type: 'string', example: 'barbarian-two' },
        name: { type: 'string', example: 'Barbarian Two' },
        description: { type: 'string', example: 'Bro is Raging Mad' },
        subclass: { type: 'array', example: ["sub1name", "sub2name"] },
        apiUrl: { type: 'string', example: 'api/classes/barbarian-two' },
        sourceBook: { type: 'string', example: "Homebrew" },
        url: { type: 'string', example: "dndbeyond.com" }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);