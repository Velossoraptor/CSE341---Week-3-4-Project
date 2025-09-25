const mongodb = require('../db/connect'); // Import the database connection module

async function findOrCreateUser(profile) {
  // Connect and look for a user
  const user = await mongodb
    .getDb()
    .db('dnd')
    .collection('users')
    .findOne({ githubId: profile.id });

  // If there is no user found, create a new user and store the information
  if (!user) {
    user = {
      githubId: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      profileUrl: profile.profileUrl,
    };
    await mongodb.getDb.db('dnd').collection('users').insertOne(user);
  }
  // return the user
  return user;
}

module.exports = { 
    findOrCreateUser 
};
