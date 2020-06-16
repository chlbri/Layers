import { DataTypes } from "../../domain/contract/Data";
import Entity from "../../domain/contract/Entity";
import { Nullish } from "../../core/Nullish";
import IFunction from "../../domain/contract/NFunction";
import { BulkQuery, Query } from "../../domain/contract/Query";

type NBQP<E extends (DataTypes | Entity)[]> = BulkQuery<E>;
type NBQ<E extends (DataTypes | Entity)[]> = Query<E>;

export default interface Bulk<E extends Entity> {
  bulkCreate: NBQP<[Partial<E>]>;
  // queryRead: NBQP<[Partial<E>]>;
  bulkUpdate: NBQP<[Partial<E>, Partial<E>]>;
  bulkDelete: NBQP<[string]>;
  execute: NBQ<[any]>;
  // execute:NBQ<[any]>;
  // execute:NBQ<[any]>;
}

import { MongoClient } from "mongodb";
import assert from "assert";

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "myproject";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err, client) => {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
  const collection = db.collection("inserts");
  const b = collection.initializeOrderedBulkOp();

  // Insert a single document
  db.collection("inserts").insertOne({ a: 1 }, function (err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    // Insert multiple documents
    db.collection("inserts").insertMany(
      [{ a: 2 }, { a: 3 }],
      function (err, r) {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);

        client.close();
      }
    );
  });
});
