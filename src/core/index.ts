/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as path from 'path';
import settings from '@Core/settings';
import database, { DatabaseManager } from '@Database/index';
import logs from '@Core/logs';

let databaseManager: DatabaseManager;

/**
 * Start the Spooked CMS.
 * 
 * @async
 * @function
 * @returns { Promise<void> }
 */
async function start(): Promise<void> {
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

  try {
    // Update settings cache.
    settings.updateCache();

    // Initialize the database manager.
    databaseManager = database(settings.getDatabaseConfigFromCache());

    // Connect to the database.
    await databaseManager.connect();
  } catch (error) {
    // Check if the error is an Error object.
    if (error instanceof Error) {
      logs.error(error.message);
    }
    // Check if the error is a string.
    else if (typeof error === 'string') {
      logs.error(error);
    }
  }
}

/**
 * Get the root directory of the project.
 * @constant
 */
const root: string = path.dirname(path.resolve(__dirname, '../')).replace('\\', '/');

/**
 * Change the console title.
 * 
 * @function
 * @param { string } title
 * @returns { void }
 */
function setConsoleTitle(title: string): void {
  process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7))
}

/**
 * Get an async time out.
 * 
 * @function
 * @param { number } miliseconds
 * @returns { Promise<void> }
 */
function sleep(miliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

/**
 * Get the database manager.
 * 
 * @function
 * @returns { DatabaseManager }
 */
function getDatabase(): DatabaseManager {
  if (databaseManager == null) {
    throw new Error('The database manager is not initialized.');
  }

  return databaseManager;
}

/**
 * Export default values.
 * @exports
 */
export default {
  start,
  root,
  setConsoleTitle,
  sleep,
  getDatabase,
};
