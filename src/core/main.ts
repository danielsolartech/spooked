/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import consoleArguments, { ArgumentsManager } from '@Core/settings/arguments';
import database, { DatabaseManager } from '@Database/main';
import * as settings from '@Core/settings';
import logs from '@Core/logs';
import * as path from 'path';

let argumentsManager: ArgumentsManager;
let databaseManager: DatabaseManager;

/**
 * Start the Spooked CMS.
 * 
 * @exports
 * @async
 * @function
 * @returns { Promise<void> }
 */
export async function start(): Promise<void> {
  console.clear();
  setConsoleTitle('SpookedCMS | Loading...');

  console.log(' ________  ________  ________  ________  ___  __    _______   ________     ');
  console.log('|\\   ____\\|\\   __  \\|\\   __  \\|\\   __  \\|\\  \\|\\  \\ |\\  ___ \\ |\\   ___ \\    ');
  console.log('\\ \\  \\___|\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\/  /|\\ \\   __/|\\ \\  \\_|\\ \\   ');
  console.log(' \\ \\_____  \\ \\   ____\\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\   ___  \\ \\  \\_|/_\\ \\  \\ \\\\ \\  ');
  console.log('  \\|____|\\  \\ \\  \\___|\\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\_|\\ \\ \\  \\_\\\\ \\ ');
  console.log('    ____\\_\\  \\ \\__\\    \\ \\_______\\ \\_______\\ \\__\\\\ \\__\\ \\_______\\ \\_______\\');
  console.log('   |\\_________\\|__|     \\|_______|\\|_______|\\|__| \\|__|\\|_______|\\|_______|');
  console.log('   \\|_________|                                                            ');
  console.log('                            © 2020 - CMS Template');
  console.log('');

  // Initialize the arguments manager.
  argumentsManager = consoleArguments();

  try {
    // Update settings file cache.
    await settings.updateCache('file');

    // Initialize the database manager.
    databaseManager = database(settings.getDatabaseConfigFromCache());

    // Connect to the database.
    await databaseManager.connect();

    // Update settings database cache.
    await settings.updateCache('db');

    // Change the console title.
    setConsoleTitle('SpookedCMS | Started');
  } catch (error) {
    // Check if the error is an Error object.
    if (error instanceof Error) {
      logs.error(error.message);
    }
    // Check if the error is a string.
    else if (typeof error === 'string') {
      const dbName = settings.getDatabaseConfigFromCache().name;

      // Check if the error is `Unknown database '(name)'`
      if (
        databaseManager.isMySQL() &&
        error === `Unknown database '${dbName}'`
      ) {
        if (argumentsManager.showWarnings) {
          logs.warning(`Creating a new database called '${dbName}'`);
        }

        // Get the settings from the cache.
        const settingsDatabase = settings.getDatabaseConfigFromCache();

        // Set the database name as undefined.
        settingsDatabase.name = undefined;

        // Create a new database manager.
        databaseManager = database(settingsDatabase);

        // Connect to the database without the database name.
        await databaseManager.connect();

        // Execute the database creation query.
        databaseManager.getMySQLConnection().query(
          `CREATE DATABASE ${dbName};`,
          async (error, _rows, _fields) => {
            if (error) {
              logs.error(error.sqlMessage || error.message);
              return;
            }

            logs.success(`'${dbName}' database was created.`);

            // Restart the server.
            await restart();
          },
        );

        return;
      }

      logs.error(error);
    }
  }
}

/**
 * Get the root directory of the project.
 * 
 * @exports
 * @constant
 */
export const root: string = path.dirname(path.resolve(__dirname, '../')).replace('\\', '/');

/**
 * Change the console title.
 * 
 * @exports
 * @function
 * @param { string } title
 * @returns { void }
 */
export function setConsoleTitle(title: string): void {
  process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7))
}

/**
 * Get an async time out.
 * 
 * @exports
 * @function
 * @param { number } miliseconds
 * @returns { Promise<void> }
 */
export function sleep(miliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

/**
 * Get the arguments manager.
 * 
 * @exports
 * @function
 * @returns { ArgumentsManager }
 */
export function getArguments(): ArgumentsManager {
  if (argumentsManager == null) {
    throw new Error('The arguments manager is not initialized.');
  }

  return argumentsManager;
}

/**
 * Get the database manager.
 * 
 * @exports
 * @function
 * @returns { DatabaseManager }
 */
export function getDatabase(): DatabaseManager {
  if (databaseManager == null) {
    throw new Error('The database manager is not initialized.');
  }

  return databaseManager;
}

export async function dispose(): Promise<void> {
  if (databaseManager != null) {
    await databaseManager.dispose();
  }
}

export async function restart(): Promise<void> {
  setConsoleTitle('SpookedCMS | Restarting...');

  logs.status('Restating...');
  await dispose();

  await start();
}
