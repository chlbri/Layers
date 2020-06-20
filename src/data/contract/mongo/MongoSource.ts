import {
  OrderedBulkOperation,
  FSyncOptions,
  MongoClientOptions,
} from "mongodb";
import CRUD from "../../../domain/contract/repo/crud";
import Bulk from "../../../domain/contract/repo/bulk";
import NFunction from "../../../domain/contract/NFunction";
import ReturnData from "../../../domain/contract/ReturnData";

export default interface MongoSource {
  url: string;
  dbName: string;
  options?: MongoClientOptions;
}

import {MongoClient} from 'mongodb';
import assert from 'assert';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  // Insert a single document
  db.collection('inserts').insertOne({a:1}, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    // Insert multiple documents
    db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
      assert.equal(null, err);
      assert.equal(2, r.insertedCount);

      client.close();
    });
  });
});