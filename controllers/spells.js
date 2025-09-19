const mongodb = require('../db/connect'); // Import the database connection module

const ObjectId = require('mongodb').ObjectId;
const idRegex = /^[a-z-]+$/;

// Gets all spells
const getAll = (req, res) => {
  console.log('Getting All Spells'); // DEBUGGING
  mongodb
    .getDb()
    .db('dnd')
    .collection('spells')
    .find()
    .toArray()
    .then((spells) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(spells);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

  const getSingle = (req, res) => {
    console.log('Getting Single Spell'); // DEBUGGING
    if(!ObjectId.isValid(req.params.id) && !idRegex.test(req.params.id)){
      return res.status(400).json('Must use a valid spell id/index to find a spell');
    }

    let query;
    if(ObjectId.isValid(req.params.id)){
      query = {_id: new ObjectId(req.params.id)}
    }else if(idRegex.test(req.params.id)){
      query = {index: req.params.id};
    }

      mongodb
        .getDb()
        .db('dnd')
        .collection('spells')
        .find(query)
        .toArray()
        .then((spells)=>{
          if(!spells || spells.length === 0){
            return res.status(404).json({ message: `No spell found for ${JSON.stringify(query)}`})
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(spells[0]);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message || err });
        });
  };

// >>>> Not Implemented Yet <<<<

const createNewSpell = async (req, res) => {
  // Async function to create a new spell
  console.log("Create New Spell"); // DEBUGGING
  try {
    const collection = await mongodb.getDb().db('dnd').collection('spells');
    const result = await collection.insertOne(req.body, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
    });
    res.status(200).send(result.insertedId); // Return the ID of the newly created spell
    console.log(result.insertedId); // Log the ID of the newly created spell
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Creating New Spell\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

const updateSpell = async (req, res) => {
  // Async function to update a spell by ID
  console.log("Update Spell"); // DEBUGGING
  try {
    if(!ObjectId.isValid(req.params.id) && !idRegex.test(req.params.id)){
      return res.status(400).json('Must use a valid spell id/index to find a spell');
    }

    let query;
    if(ObjectId.isValid(req.params.id)){
      query = {_id: new ObjectId(req.params.id)}
    }else if(idRegex.test(req.params.id)){
      query = {index: req.params.id};
    }

    const collection = await mongodb.getDb().db('dnd').collection('spells');
    const result = await collection.updateOne(
      query,
      {
        $set: {
          index: req.body.index,
          name: req.body.name,
          level: req.body.level,
          url: req.body.url,
        },
      }
    );
    if (result.matchedCount === 0) {
      return res
        .status(404)
        .send('Error 404: No spell found with id: ' + req.params.id);
    }
    res.status(200).send('Updated Id:' + req.params.id); // Success status and return the ID of the updated spell
    console.log(req.body);
    console.log('Updated spell ' + spellIdToModify);
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

const deleteSpell = async (req, res) => {
  // Async function to delete a spell by ID
  try {
    if(!ObjectId.isValid(req.params.id) && !idRegex.test(req.params.id)){
      return res.status(400).json('Must use a valid spell id/index to find a spell');
    }

    let query;
    if(ObjectId.isValid(req.params.id)){
      query = {_id: new ObjectId(req.params.id)}
    }else if(idRegex.test(req.params.id)){
      query = {index: req.params.id};
    }

    // const spellIdToDelete = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db('dnd').collection('spells');
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      // If no documents were deleted, return a 404 status
      return res
        .status(404)
        .send('Error 404: No spell found with id: ' + req.params.id);
    }
    res.status(200).send('Deleted Id:' + req.params.id); // Success status and return the ID of the deleted spell
    console.log('Deleted spell ' + JSON.stringify(query));
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
  createNewSpell,
  updateSpell,
  deleteSpell,
};
