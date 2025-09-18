const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser to parse JSON request bodies
// const validation = require("../middleware/validate");
const router = express.Router(); // Create a router instance


router.use(bodyParser.json()); // Use body-parser middleware to parse JSON

const spellsController = require('../controllers/spells'); // Import the contacts controller

router.get('/', spellsController.getAll); // Routes all /contacts requests to contacts.js getAll function

router.get('/:id', spellsController.getSingle); // Routes all /contacts/:id requests to contacts.js getSingle function

// router.post('/', validation.saveContact, spellsController.createNew); // Routes all POST /contacts requests to contacts.js createNew function

// router.put('/:id', validation.saveContact, spellsController.updateContact); // Routes all PUT /contacts/:id-to-modify requests to contacts.js updateContact function

// router.delete('/:id', spellsController.deleteContact); // Routes all DELETE /contacts/:id-to-delete requests to contacts.js deleteContact function

module.exports = router;