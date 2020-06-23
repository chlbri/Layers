import { MongoClient, ObjectID, OrderedBulkOperation } from "mongodb";
import CRUD from "../../../domain/contract/repo/crud";
import Bulk from "../../../domain/contract/repo/bulk";
import ReturnData, {
  PromiseReturnData as PrD,
  BadResponse,
  Response500,
  GoodResponse,
  Response404,
  Response300,
} from "../../../domain/contract/ReturnData";
import MongoSource from "./MongoSource";
import { isBad, FetchStatus } from "../../../domain/contract/Fetch";
import _Id from "../../../domain/contract/_Id";
import Piped from "../../../domain/contract/Piped";
import { isNil } from "lodash";
import isNilEvery from "../../../core/Nil";

export default class MongoRepo<E extends _Id> extends Piped
  implements CRUD<E>, Bulk<E> {
  constructor(
    private collection: string,
    private source: MongoSource
  ) {
    super();
  }

  private async getBulk() {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (isBad(status)) {
      return Response500;
    }
    const col = payload!
      .db(this.source.dbName)
      .collection(this.collection);
    return col.initializeOrderedBulkOp();
  }

  private async connect(): PrD<MongoClient> {
    const client = new MongoClient(
      this.source.url,
      this.source.options
    );

    return client.connect().then(
      (cl) => ({
        status: 200,
        payload: cl,
      }),
      (_) => {
        client.close();
        return {
          status: 500,
        };
      }
    );
  }

  close(client: MongoClient, force = false) {
    return () => client.close(force);
  }

  async create(arg: Partial<E>) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (this.errorConnect(status, payload)) {
      return Response500;
    }

    const col = payload
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
      .catch((_) => Response404)
      .finally(this.close(payload));

    return out;
  }

  async read(arg: Partial<E>) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (this.errorConnect(status, payload)) {
      return Response500;
    }
    const col = payload
      .db(this.source.dbName)
      .collection<E>(this.collection);
    const out = await col
      .findOne(arg)
      .then((val) => {
        const assert = !!val;
        const response200: GoodResponse<E> = {
          status: 200,
          payload: val!,
        };
        const response204: GoodResponse = {
          status: 204,
          payload: undefined,
        };
        return assert ? response200 : response204;
      })
      .catch((_) => Response404)
      .finally(() => payload.close());

    return out;
  }

  async update(arg1: Partial<E>, arg2: Partial<E>) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (this.errorConnect(status, payload)) {
      return Response500;
    }
    const col = payload
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
      .catch((_) => Response404)
      .finally(() => payload.close());

    return out;
  }

  async delete(arg: string) {
    const { status, payload } = await this.connect().finally(() =>
      console.log("")
    );

    if (this.errorConnect(status, payload)) {
      return Response500;
    }
    const col = payload
      .db(this.source.dbName)
      .collection(this.collection);
    const _id = new ObjectID(arg);
    col.bulkWrite([]);
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
      .catch((_) => Response404)
      .finally(() => payload.close());

    return out;
  }

  private InsertsList: Partial<E>[] = [];
  private UpdatesList: [Partial<E>, Partial<E>][] = [];
  private DeletesList: Partial<E>[] = [];

  bulkCreate(...args: Partial<E>[]) {
    this.InsertsList.push(...args);
  }

  bulkUpdate(...args: [Partial<E>, Partial<E>][]) {
    this.UpdatesList.push(...args);
  }

  bulkDelete(...args: Partial<E>[]) {
    this.DeletesList.push(...args);
  }

  errorConnect(
    status: FetchStatus,
    payload: any
  ): payload is null | undefined {
    return isBad(status) || !payload;
  }

  async execute() {
    const { status, payload } = await this.connect()
    if (this.errorConnect(status, payload)) {
      return Response500;
    }

    if (
      isNilEvery(this.DeletesList, this.InsertsList, this.UpdatesList)
    ) {
      return Response300;
    }
    /*eslint operator-linebreak: ["error", "after"]*/
    const Response204: ReturnData<number> = {
      status: 204,
      payload: 0,
    };

    const bulk = payload
      .db(this.source.dbName)
      .collection<E>(this.collection)
      .initializeOrderedBulkOp();

    this.InsertsList.forEach((insert) => bulk.insert(insert));
    this.UpdatesList.forEach((update) =>
      bulk.find(update[0]).updateOne(update[1])
    );

    this.DeletesList.forEach((toDelete) =>
      bulk.find(toDelete).delete()
    );

    return await bulk
      .execute()
      .then((val) => {
        const opNumber =
          val.nInserted + val.nModified + val.nRemoved;

        const Response200: ReturnData<number> = {
          status: 200,
          payload: opNumber,
        };

        return opNumber > 1 ? Response200 : Response204;
      })
      .catch(() => Response404)
      .finally(() => payload.close());
  }
}
