const mongodb = require('../db/connect'); // Import the database connection module

const ObjectId = require('mongodb').ObjectId;

async function findOrCreateUser(profile) {
  console.log('Adding user');
  const collection = await mongodb.getDb().db('dnd').collection('users');

  let user = await collection.findOne({ githubId: profile.id });

  if (!user) {
    const newUser = {
      githubId: profile.id,
      username: profile.username,
      profileUrl: profile.profileUrl,
      bio: profile._json?.bio,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);
    user = newUser;
  }
  console.log('user Added');
  return user;
}

module.exports = {
  findOrCreateUser,
};
