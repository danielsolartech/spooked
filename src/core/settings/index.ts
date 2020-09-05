/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import ISettingFile, { ISettingDatabase } from './ISettingFile';
import files from '@Core/files/';

let settingsFile: ISettingFile = {
  database: {
    type: 'mysql',
    host: '',
    port: 0,
    user: '',
    password: '',
  },
};

/**
 * Update the settings file cache from `{root}/settings/general.json`.
 * 
 * @function
 * @returns { void }
 */
function updateCache(): void {
  // Go to the `/settings` directory.
  let settingsDirectory = files().directory('settings');

  // Check if the rute `/settings` exists.
  if (!settingsDirectory.exists()) {
    throw new Error(`'${settingsDirectory.getFullPath()}' does not exist.`);
  }

  // Check if the rute `/settings` is a directory.
  if (!settingsDirectory.isDirectory()) {
    throw new Error(`'${settingsDirectory.getFullPath()}' is not a directory.`);
  }

  // Go to the `general.json` file.
  settingsDirectory = settingsDirectory.file('general.json');

  // Check if the rute `/settings/general.json` exists.
  if (!settingsDirectory.exists()) {
    throw new Error(`'${settingsDirectory.getFullPath()}' does not exist.`);
  }

  // Check if the rute `/settings/general.json` is a file.
  if (!settingsDirectory.isFile()) {
    throw new Error(`'${settingsDirectory.getFullPath()}' is not a file.`);
  }

  // Set the new settings from the file.
  settingsFile = settingsDirectory.toJSON();
}

/**
 * Get the database configuration from the settings file cache.
 * 
 * @function
 * @returns { ISettingDatabase }
 */
function getDatabaseConfigFromCache(): ISettingDatabase {
  return settingsFile.database;
}

/**
 * Export default values.
 * @exports
 */
export default {
  updateCache,
  getDatabaseConfigFromCache,
};
