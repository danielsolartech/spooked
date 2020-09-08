/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { Command } from 'commander';

export interface ArgumentsManager {
  /**
   * If the warnings will show in the console.
   * @readonly
   */
  readonly showWarnings: boolean;

  /**
   * Path of the settings file.
   * @readonly
   */
  readonly settingsFile: string;
}

/**
 * Arguments manager.
 * 
 * @exports
 * @function
 * @returns { ArgumentsManager }
 */
export default function consoleArguments(): ArgumentsManager {
  // Create a new command object.
  const program = new Command();

  // Add arguments to the console program.
  program
    .option(
      '--no-warnings',
      'Do not show you the application warnings.',
    )
    .option(
      '-s, --settings <path>',
      'Set a settings file (It must be in the root directory).',
      './settings/general.json',
    );

  // Parse the console arguments.
  program.parse(process.argv);

  // Get the program options.
  const options = program.opts();

  // Return the arguments manager.
  return {
    showWarnings: options.warnings === true,
    settingsFile: options.settings,
  };;
}
