const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStratergy'); // scoping the debug to localStratergy()

// MongoDB connection details
const url = "**********";
const dbName = 'GlobalEdge';

module.exports = function localStratergy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    (async function () {
      const client = await MongoClient.connect(url);
      try {
        const user = await client.db(dbName).collection('Users').findOne({ username });

        if (user && user.password == password) {
          done(null, user); // passing the user after authentication
        }
        else {
          done(null, false);  // no user sent
        }
      } catch (error) {
        debug(error, false);
      }
      await client.close();
    }())
  }))
}