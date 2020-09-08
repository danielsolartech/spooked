/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { ISettingDatabase } from '@Core/settings/ISettingFile';
import { getArguments } from '@Spooked';
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

  /**
   * Check if the current connection is a MySQL connection.
   * 
   * @function
   * @returns { boolean }
   */
  isMySQL(): boolean;

  /**
   * Check if the current connection is a MongoDB connection.
   * 
   * @function
   * @returns { boolean }
   */
  isMongoDB(): boolean;

  /**
   * Get the current MySQL connection.
   * 
   * @function
   * @returns { MySQLConnection }
   */
  getMySQLConnection(): MySQLConnection;

  dispose(): Promise<void>;
}

/**
 * Database manager.
 * 
 * @exports
 * @param { ISettingDatabase } settings
 * @returns { DatabaseManager }
 */
export default function database(settings: ISettingDatabase): DatabaseManager {
  const database_return: DatabaseManager = {
    connect,
    isMySQL: (): boolean => settings.type === 'mysql',
    isMongoDB: (): boolean => settings.type === 'mongodb',
    getMySQLConnection,
    dispose,
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

      if (!settings.host.length) {
        settings.host = 'localhost';

        if (getArguments().showWarnings) {
          logs.warning(`The database host was changed to '${settings.host}' by default`);
        }
      }

      if (settings.type === 'mysql') {
        if (!settings.user.length) {
          logs.error('Database connection');
          reject(new Error('The database username is empty.'));
          return;
        }

        if (settings.port <= 0) {
          settings.port = 3306;

          if (getArguments().showWarnings) {
            logs.warning(`The database port was changed to '${settings.port}' by default`);
          }
        }

        let connection_string: string = `mysql://${settings.user}`;

        if (settings.password.length) {
          connection_string += `:${settings.password}`;
        }

        connection_string += `@${settings.host}:${settings.port}/`;

        if (settings.name && settings.name.length) {
          connection_string += settings.name;
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
          settings.port = 27017;

          if (getArguments().showWarnings) {
            logs.warning(`The database port was changed to '${settings.port}' by default`);
          }
        }

        let connection_string: string = `mongodb://`;

        if (settings.user.length) {
          connection_string += settings.user;

          if (settings.password.length) {
            connection_string += `:${settings.password}`;
          }

          connection_string += '@';
        }

        connection_string += `${settings.host}:${settings.port}`;

        if (settings.name && settings.name.length) {
          connection_string += `/${settings.name}`;
        }

        // Create the MongoDB connection.
        await MongoConnect(connection_string, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
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

  function getMySQLConnection(): MySQLConnection {
    // Check if the current connection is a MySQL connection.
    if (!database_return.isMySQL()) {
      throw new Error('The current connection is not a MySQL connection');
    }

    // Check if the connection is not empty.
    if (mysql_connection == null) {
      throw new Error('You need connect to the database');
    }

    return mysql_connection;
  }

  function dispose(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (database_return.isMySQL()) {
        database_return.getMySQLConnection().end((error) => {
          if (error) {
            reject(error.sqlMessage || error.message);
            return;
          }

          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  return database_return;
}
