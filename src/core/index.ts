/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as Path from 'path';

async function initialize(): Promise<void> {
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
}

/**
 * Get the root directory of the project.
 * @constant
 */
const root: string = Path.dirname(Path.resolve(__dirname, '../')).replace('\\', '/');

/**
 * Change the console title.
 * 
 * @function
 * @param { string } title
 * @returns { void }
 */
function setConsoleTitle(title: string) : void {
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
 * Export default values.
 * @exports
 */
export default {
  initialize,
  root,
  setConsoleTitle,
  sleep,
};
