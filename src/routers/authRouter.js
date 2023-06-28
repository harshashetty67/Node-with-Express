const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:authRouter'); // scoping the debug to authRouter
const passport = require('passport');  // For authentication
const authRouter = express.Router();

const url = "**********";
const dbName = 'GlobalEdge';

// Post request handling the Sign-up
authRouter.route('/signup').post((req, res) => {

  const { username, password } = req.body;  // destructuring the data from request body

  (async function addUser() {
    try {
      const user = { username, password };
      const client = await MongoClient.connect(url);
      const result = await client.db(dbName).collection('Users').insertOne(user);  // adding the user to 'Users' collection
      const userFromDB = await client.db(dbName).collection('Users').findOne({ _id: new ObjectId(result.insertedId) });
      req.logIn(userFromDB, () => {
        res.redirect('/auth/profile');
      });
    }
    catch (error) {
      debug(error);
    }
    await client.close();
  }())
}
)

// Handling Sign-in 
authRouter.route('/signIn').get((req, res) => {
  res.render('signIn');         // rendering the 'sigin' ejs template.
}).post(passport.authenticate('local', {
  successRedirect: '/auth/profile',
  failureRedirect: '/'   // on failed authentication go to homepage.
}));

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
}
)

module.exports = authRouter;