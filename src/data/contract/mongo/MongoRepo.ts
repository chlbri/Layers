import { MongoClient, ObjectID } from "mongodb";
import CRUD from "../crud";
import Bulk from "../bulk";
import {
  PromiseReturnData,
  BadResponse,
  response500,
  GoodResponse,
  response404,
} from "../../../domain/contract/ReturnData";
import MongoSourceConfig from "./MongoSource";
import { isBad } from "../../../domain/contract/Fetch";
import uid from "../../../domain/contract/uid";

export default class MongoSource<T extends uid>
  implements CRUD<T>, Bulk<T> {
  constructor(
    private collection: string,
    private source: MongoSourceConfig
  ) {}

  async getBulk() {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (isBad(status)) {
      return response500;
    }
    const col = payload!
      .db(this.source.dbName)
      .collection(this.collection);
    return col.initializeOrderedBulkOp();
  }

  async execute() {
    return response500;
  }

  private get client() {
    return new MongoClient(this.source.url, this.source.options);
  }

  private async connect(): PromiseReturnData<MongoClient> {
    return this.client.connect().then(
      (cl) => ({
        status: 200,
        payload: cl,
      }),
      (_) => ({
        status: 500,
      })
    );
  }

  async create(arg: Partial<T>) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (isBad(status)) {
      return response500;
    }
    const col = payload!
      .db(this.source.dbName)
      .collection(this.collection);

    const out = await col
      .insertOne(arg)
      .then((val) => {
        const assert = val.insertedCount === 1;
        const response200: GoodResponse = {
          status: 200,
          payload: undefined,
        };
        const response204: GoodResponse = {
          status: 204,
          payload: undefined,
        };
        return assert ? response200 : response204;
      })
      .catch((_) => response404)
      .finally(() => payload!.close());

    return out;
  }

  async read(arg: Partial<T>) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (isBad(status)) {
      return response500;
    }
    const col = payload!
      .db(this.source.dbName)
      .collection<T>(this.collection);
    const out = await col
      .findOne(arg)
      .then((val) => {
        const assert = !!val;
        const response200: GoodResponse<T> = {
          status: 200,
          payload: val!,
        };
        const response204: GoodResponse = {
          status: 204,
          payload: undefined,
        };
        return assert ? response200 : response204;
      })
      .catch((_) => response404)
      .finally(() => payload!.close());

    return out;
  }

  async update(arg1: Partial<T>, arg2: Partial<T>) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (isBad(status)) {
      return response500;
    }
    const col = payload!
      .db(this.source.dbName)
      .collection(this.collection);

    const out = await col
      .updateOne(arg1, arg2)
      .then((val) => {
        const modified = val.modifiedCount === 1;
        const matched = val.matchedCount === 1;
        const response200: GoodResponse = {
          status: 200,
          payload: undefined,
        };
        const response204: GoodResponse = {
          status: 204,
          payload: undefined,
        };
        const response300: BadResponse = {
          status: 300,
          payload: undefined,
        };
        return modified
          ? response200
          : matched
          ? response204
          : response300;
      })
      .catch((_) => response404)
      .finally(() => payload!.close());

    return out;
  }

  async delete(arg: string) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (isBad(status)) {
      return response500;
    }
    const col = payload!
      .db(this.source.dbName)
      .collection(this.collection);
    const _id = new ObjectID(arg);
    const out = await col
      .findOneAndDelete({ _id })
      .then((val) => {
        const assert = !!val;
        const response200: GoodResponse<number> = {
          status: 200,
          payload: val!.ok!,
        };
        const response204: GoodResponse = {
          status: 204,
          payload: undefined,
        };
        return assert ? response200 : response204;
      })
      .catch((_) => response404)
      .finally(() => payload!.close());

    return out;
  }

  // get createRepo(): CRUD<T> & Bulk<T> {
  //   return {
  //     create: this.create,
  //     read: this.read,
  //     update: this.update,
  //     delete: this.delete,
  //     bulkCreate: this.bulkCreate,
  //     queryRead: this.queryRead,
  //     bulkUpdate: this.bulkUpdate,
  //     bulkDelete: this.bulkDelete,
  //   };
  // }

  bulkCreate() {}
  bulkUpdate() {}
  bulkDelete() {}
}
