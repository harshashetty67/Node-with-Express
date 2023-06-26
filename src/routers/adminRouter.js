const express = require('express');
const { MongoClient } = require('mongodb');
const sessionData = require('../data/sessions.json') // importing session data

const debug = require('debug')('app:adminRouter'); // scoping the debug to adminRouter.

const adminRouter = express.Router();

const url = "******************";
const dbName = 'GlobalEdge';

adminRouter.route('/').get((req, res) => {
  (async function mongo() {
    try {
      const client = await MongoClient.connect(url);
      const result = await client.db(dbName).collection('session').insertMany(sessionData);
      res.json(result);
    }
    catch (error) {
      debug(error.stack);
    }
  }())

}
)


module.exports = adminRouter;