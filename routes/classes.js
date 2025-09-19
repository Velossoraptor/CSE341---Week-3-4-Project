const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser to parse JSON request bodies
const validation = require("../middleware/validate"); // Import Validation middleware
const router = express.Router(); // Create a router instance


router.use(bodyParser.json()); // Use body-parser middleware to parse JSON

const classesController = require('../controllers/classes'); // Import the contacts controller

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     responses:
 *       200:
 *         description: List of classes
 *       404:
 *         description: No classes Found
 *       500:
 *         description: Server Error
 */
router.get('/', classesController.getAll); // Routes all /classes requests to classes.js getAll function

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get a class by Id or index (name of the class, no caps)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: class Found
 *       404:
 *         description: No class Found; Check Id/Name
 *       500:
 *         description: Server Error
 */
router.get('/:id', classesController.getSingle); // Routes all /classes/:id requests to classes.js getSingle function

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a new class
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: class
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Class'
 *     responses:
 *       201:
 *         description: Class Created Successfully
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Server Error
 */
router.post('/', validation.saveClass, classesController.createNewClass); // Routes all POST /classes requests to classes.js createNew function

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update an existing class
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: class
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Class'
 *     responses:
 *       200:
 *         description: Class Updated Successfully
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Class Not Found
 *       500:
 *         description: Server Error
 */
router.put('/:id', validation.saveClass, classesController.updateClass); // Routes all PUT /classes/:id-to-modify requests to classes.js updateClass function

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete an existing class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: the classes id or name (will delete the first copy if duplicates exist with same index name)
 *     responses:
 *       200:
 *         description: Class Deleted Successfully
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Class Not Found
 *       500:
 *         description: Server Error
 */
router.delete('/:id', classesController.deleteClass); // Routes all DELETE /classes/:id-to-delete requests to classes.js deleteClass function

module.exports = router;