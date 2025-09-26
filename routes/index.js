const express = require('express');
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const passport = require('passport');

var options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/', (req, res) => {
  // Default Hello World so that we're friendly :)
  console.log(req.session.user);
  if (req.session.user) {
    res.send(
      `Hello World! Visit /api-docs to see documentation.\nLogged in as ${req.session.user.username}`
    );
    console.log(req.session.user.username);
  } else {
    res.send(`Hello World! Visit /api-docs to see documentation.\nLogged Out`);
  }
});

router.use('/spells', require('./spells')); // Routes all /spells requests to spells.js
router.use('/classes', require('./classes')); // Routes all /spells requests to spells.js

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
