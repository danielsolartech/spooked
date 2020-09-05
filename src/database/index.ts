/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { ISettingDatabase } from '@Core/settings/ISettingFile';
import logs from '@Core/logs';

import {
  Connection as MySQLConnection,
  createConnection as MySQLConnect,
} from 'mysql';

import {
  connect as MongoConnect,
} from 'mongoose';

export interface DatabaseManager {
  /**
   * Connect to the database.
   * 
   * @async
   * @function
   * @returns { Promise<DatabaseManager> }
   */
  connect(): Promise<DatabaseManager>;
}

function database(settings: ISettingDatabase): DatabaseManager {
  const database_return: DatabaseManager = {
    connect,
  };

  let mysql_connection: MySQLConnection;

  function connect(): Promise<DatabaseManager> {
    logs.status('The database connection is starting');

    return new Promise(async (resolve, reject) => {
      if (settings.type !== 'mysql' && settings.type !== 'mongodb') {
        logs.error('Database connection');
        reject(new Error('The database type is not valid.'));
        return;
      }

      if (!settings.user.length) {
        logs.error('Database connection');
        reject(new Error('The database username is empty.'));
        return;
      }

      if (!settings.host.length) {
        logs.warning('The database host was changed to `localhost` by default');
        settings.host = 'localhost';
      }

      if (settings.type === 'mysql') {
        if (settings.port <= 0) {
          logs.warning('The database port was changed to `3306` by default');
          settings.port = 3306;
        }

        let connection_string: string = `mysql://${settings.user}`;

        if (settings.password.length) {
          connection_string += `:${settings.password}`;
        }

        connection_string += `@${settings.host}:${settings.port}`;

        if (settings.name && settings.name.length) {
          connection_string += `/${settings.name}`;
        }

        // Create the MySQL connection.
        mysql_connection = MySQLConnect(connection_string);

        // Connect to the MySQL database.
        mysql_connection.connect((error) => {
          if (error) {
            logs.error('Database connection');
            reject(error.sqlMessage || error.message);
            return;
          }

          logs.success('Database connected');
          resolve(database_return);
          return;
        });

        return;
      } else if (settings.type === 'mongodb') {
        if (settings.port <= 0) {
          logs.warning('The database port was changed to `27017` by default');
          settings.port = 27017;
        }

        let connection_string: string = `mongodb://${settings.user}`;

        if (settings.password.length) {
          connection_string += `:${settings.password}`;
        }

        connection_string += `@${settings.host}:${settings.port}`;

        if (settings.name && settings.name.length) {
          connection_string += `/${settings.name}`;
        }

        // Create the MongoDB connection.
        await MongoConnect(connection_string, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
          .then(() => {
            logs.success('Database connected');
            resolve(database_return);
          })
          .catch((error) => {
            logs.error('Database connection');
            reject(error.message);
          });


        return;
      }
    });
  }

  return database_return;
}

/**
 * Export default values.
 * @exports
 */
export default database;
