const express = require('express'); // Common-JS based import
const sessionRouter = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const debug = require('debug')('app:sessionRouter'); // scoping the debug

const url = "mongodb+srv://harshashetty67:dHs8ttYwb2hvf7Fr@my-mongo.elbhwd6.mongodb.net/";
const dbName = 'GlobalEdge';

sessionRouter.route('/').get( // for normal /sessions route.
  (req, res) => {
    (async function mongo() {
      try {
        const client = await MongoClient.connect(url);
        debug('Connected to DB.')
        const sessions = await client.db(dbName).collection('session').find().toArray(); // fetch all records from 'session' collection
        res.render("sessions", {
          sessions
        });
        debug('Got all records from DB.')
      }
      catch (error) {
        debug(error.stack);
      }
    }())
  }
)

sessionRouter.route('/:id').get(   // for route with 'sessionId'
  (req, res) => {
    const id = req.params.id;
    (async function mongo() {
      try {
        const client = await MongoClient.connect(url);
        debug('Connected to DB.')

        /* - Fetch the record based on _id from collection 
           -  The id from route is string, so need to convert it to ObjectId form as mongo needs it.
        */
        const session = await client.db(dbName).collection('session').findOne({ _id: new ObjectId(id) });
        console.log(session)
        debug('Got the matching record from DB.')
        res.render("session", {
          session
        });
      }
      catch (error) {
        debug(error.stack);
      }
    }())
  }
)

module.exports = sessionRouter;  // exporting the sessionRouter object