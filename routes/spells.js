const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser to parse JSON request bodies
const validation = require("../middleware/validate");
const router = express.Router(); // Create a router instance


router.use(bodyParser.json()); // Use body-parser middleware to parse JSON

const spellsController = require('../controllers/spells'); // Import the contacts controller

/**
 * @swagger
 * /spells:
 *   get:
 *     summary: Get all Spells
 *     responses:
 *       200:
 *         description: List of Spells
 *       404:
 *         description: No Spells Found
 *       500:
 *         description: Server Error
 */
router.get('/', spellsController.getAll); // Routes all /contacts requests to contacts.js getAll function


/**
 * @swagger
 * /spells/{id}:
 *   get:
 *     summary: Get a spell by Id or index (name of the spell, no spaces, no caps)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Spell Found
 *       404:
 *         description: No Spell Found; Check Id/Name
 *       500:
 *         description: Server Error
 */
router.get('/:id', spellsController.getSingle); // Routes all /contacts/:id requests to contacts.js getSingle function


/**
 * @swagger
 * /spells:
 *   post:
 *     summary: Create a new spell
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: spell
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Spell'
 *     responses:
 *       201:
 *         description: Spell Created Successfully
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Server Error
 */
router.post('/', validation.saveSpell, spellsController.createNewSpell); // Routes all POST /contacts requests to contacts.js createNew function

/**
 * @swagger
 * /spells/{id}:
 *   put:
 *     summary: Update an existing spell
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: spell
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Spell'
 *     responses:
 *       200:
 *         description: Spell Updated Successfully
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Spell Not Found
 *       500:
 *         description: Server Error
 */
router.put('/:id', validation.saveSpell, spellsController.updateSpell); // Routes all PUT /contacts/:id-to-modify requests to contacts.js updateContact function

/**
 * @swagger
 * /spells/{id}:
 *   delete:
 *     summary: Delete an existing spell
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: the spells id or name (will delete the first copy if duplicates exist with same index name)
 *     responses:
 *       200:
 *         description: Spell Deleted Successfully
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Spell Not Found
 *       500:
 *         description: Server Error
 */
router.delete('/:id', spellsController.deleteSpell); // Routes all DELETE /contacts/:id-to-delete requests to contacts.js deleteContact function

module.exports = router;