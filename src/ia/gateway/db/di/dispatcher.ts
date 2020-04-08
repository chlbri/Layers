import EMBEDDED_CONTAINER from "./container/embedded";
import MARIADB_CONTAINER from "./container/mariadb";
import MONGODB_CONTAINER from "./container/mongodb";
import MYSQL_CONTAINER from "./container/mysql";
import MSSQL_CONTAINER from "./container/mssql";
import PG_CONTAINER from "./container/pg";
import SERVER_CONTAINER from "./container/server";
import SQLITE_CONTAINER from "./container/sqlite";
import Dispatcher from "../../contract/dispatcher";

const ALL = {
  embedded: EMBEDDED_CONTAINER,
  mariadb: MARIADB_CONTAINER,
  mongodb: MONGODB_CONTAINER,
  mysql: MYSQL_CONTAINER,
  mssql: MSSQL_CONTAINER,
  pg: PG_CONTAINER,
  server: SERVER_CONTAINER,
  sqlite: SQLITE_CONTAINER
};

export default Dispatcher(ALL, "mongodb");

