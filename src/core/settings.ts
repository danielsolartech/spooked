/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import ISettingFile, { ISettingDatabase } from '@Core/settings/ISettingFile';
import files from '@Core/files';
import { getArguments, getDatabase } from '@Spooked';
import * as settingsModel from '@Database/mongo/models/settings';
import logs from './logs';

let settingsFile: ISettingFile = {
  database: {
    type: 'mysql',
    host: '',
    port: 0,
    user: '',
    password: '',
  },
};

let settingsDatabase: any = {};

/**
 * Update the settings file cache from `{root}/settings/general.json` or
 * the database settings from the table or document.
 * 
 * @exports
 * @async
 * @function
 * @param { 'all' | 'file' | 'db' } type
 * @returns { Promise<void> }
 */
export async function updateCache(type: 'all' | 'file' | 'db'): Promise<void> {
  // Update settings file cache.
  if (type === 'all' || type === 'file') {
    // Go to the settings path.
    let settingsDirectory = files().setPath(getArguments().settingsFile);

    // Check if the rute exists.
    if (!settingsDirectory.exists()) {
      throw new Error(`'${settingsDirectory.getFullPath()}' does not exist.`);
    }

    // Check if the rute is a file.
    if (!settingsDirectory.isFile()) {
      throw new Error(`'${settingsDirectory.getFullPath()}' is not a file.`);
    }

    // Set the new settings from the file.
    settingsFile = settingsDirectory.toJSON();
  }

  // Update settings database cache.
  if (type === 'all' || type === 'db') {
    // Clear the settings database cache.
    settingsDatabase = {};

    // Check if the connection is a MySQL connection.
    if (getDatabase().isMySQL()) {
      // Get the MySQL connection.
      const connection = getDatabase().getMySQLConnection();

      logs.info('TODO: Add default settings in a MySQL database. Waiting for NextDatabase');
    }
    // Check if the connection is a MongoDB connection.
    else if (getDatabase().isMongoDB()) {
      // Get the settings from the database.
      let settings = await settingsModel.model.find({});

      // Insert the default settings if the settings are empty.
      if (!settings.length) {
        if (getArguments().showWarnings) {
          logs.warning('The default settings was inserted.');
        }

        settings = await settingsModel.insert_default_values();
      }

      // Add the settings to the cache.
      settings.forEach((setting) => {
        settingsDatabase[setting.key] = setting.value;
      });
    }

    console.log(settingsDatabase);
  }
}

/**
 * Get the database configuration from the settings file cache.
 * 
 * @exports
 * @function
 * @returns { ISettingDatabase }
 */
export function getDatabaseConfigFromCache(): ISettingDatabase {
  return settingsFile.database;
}
