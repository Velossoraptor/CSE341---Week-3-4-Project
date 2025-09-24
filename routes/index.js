const express = require('express');
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const passport = require("passport");

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

router.get('/', (req, res) => {
  // Default Hello World so that we're friendly :)
  res.send('Hello World! Visit /api-docs to see documentation.');
});

router.use('/spells', require('./spells')); // Routes all /spells requests to spells.js
router.use('/classes', require('./classes')); // Routes all /spells requests to spells.js

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

router.get("/login", passport.authenticate('github'), (req, res)=>{});
router.get("/logout", function(req, res, next){
  req.logout(function(errr){
    if(err){return next(err);}
    res.redirect("/");
  });
});

module.exports = router;