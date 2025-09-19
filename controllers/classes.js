const mongodb = require('../db/connect'); // Import the database connection module

const ObjectId = require('mongodb').ObjectId;
const idRegex = /^[a-z-]+$/;

// Gets all classes
const getAll = (req, res) => {
  console.log('Getting All Classes'); // DEBUGGING
  mongodb
    .getDb()
    .db('dnd')
    .collection('classes')
    .find()
    .toArray()
    .then((classes) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(classes);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// Gets Single Class by Index
const getSingle = (req, res) => {
  console.log('Getting Single Class'); // DEBUGGING
  if (!ObjectId.isValid(req.params.id) && !idRegex.test(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid spell id/index to find a class');
  }

  let query;
  if (ObjectId.isValid(req.params.id)) {
    query = { _id: new ObjectId(req.params.id) };
  } else if (idRegex.test(req.params.id)) {
    query = { index: req.params.id };
  }

  mongodb
    .getDb()
    .db('dnd')
    .collection('classes')
    .find(query)
    .toArray()
    .then((classes) => {
      if (!classes || classes.length === 0) {
        return res
          .status(404)
          .json({ message: `No class found for ${JSON.stringify(query)}` });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(classes[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message || err });
    });
};

// Async function to create a new class
const createNewClass = async (req, res) => {
  console.log('Create New Class'); // DEBUGGING
  try {
    const collection = await mongodb.getDb().db('dnd').collection('classes');
    const result = await collection.insertOne(req.body, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
    });
    res.status(200).send(result.insertedId); // Return the ID of the newly created class
    console.log(result.insertedId); // Log the ID of the newly created class
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Creating New Class\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

// Async function to update a spell by ID
const updateClass = async (req, res) => {
  console.log('Update Class'); // DEBUGGING
  try {
    if (!ObjectId.isValid(req.params.id) && !idRegex.test(req.params.id)) {
      return res
        .status(400)
        .json('Must use a valid class id/index to update a class');
    }

    let query;
    if (ObjectId.isValid(req.params.id)) {
      query = { _id: new ObjectId(req.params.id) };
    } else if (idRegex.test(req.params.id)) {
      query = { index: req.params.id };
    }

    const collection = await mongodb.getDb().db('dnd').collection('classes');
    const result = await collection.updateOne(query, {
      $set: {
        index: req.body.index,
        name: req.body.name,
        description: req.body.description,
        subclasses: req.body.subclasses,
        apiUrl: req.body.apiUrl,
        sourceBook: req.body.sourceBook,
        url: req.body.url
      },
    });
    if (result.matchedCount === 0) {
      return res
        .status(404)
        .send('Error 404: No class found with id: ' + req.params.id);
    }
    res.status(200).send('Updated Id:' + req.params.id); // Success status and return the ID of the updated spell
    console.log(req.body);
    console.log('Updated class ' + spellIdToModify);
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Updating ID: ' +
          req.params.id +
          '\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

// Async function to delete a class by ID
const deleteClass = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id) && !idRegex.test(req.params.id)) {
      return res
        .status(400)
        .json('Must use a valid class id/index to delete a spell');
    }

    let query;
    if (ObjectId.isValid(req.params.id)) {
      query = { _id: new ObjectId(req.params.id) };
    } else if (idRegex.test(req.params.id)) {
      query = { index: req.params.id };
    }

    const collection = await mongodb.getDb().db('dnd').collection('classes');
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      // If no documents were deleted, return a 404 status
      return res
        .status(404)
        .send('Error 404: No class found with id: ' + req.params.id);
    }
    res.status(200).send('Deleted Id:' + req.params.id); // Success status and return the ID of the deleted class
    console.log('Deleted class ' + JSON.stringify(query));
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Deleting ID: ' +
          req.params.id +
          '\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

module.exports = {
  getAll,
  getSingle,
  createNewClass,
  updateClass,
  deleteClass,
};