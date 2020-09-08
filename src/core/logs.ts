/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {
  bgBlue,
  bgGray,
  bgGreen,
  bgMagenta,
  bgRed,
  bgYellow,
  whiteBright,
} from 'chalk';

/**
 * Get the date information as '(day)/(month)/(year) (hours):(minutes):(seconds)'.
 * 
 * @function
 * @returns { string }
 */
function getInfo(): string {
  const date: Date = new Date(Date.now());
  const hours: string = ('0' + date.getHours()).substr(-2);
  const minutes: string = ('0' + date.getMinutes()).substr(-2);
  const seconds: string = ('0' + date.getSeconds()).substr(-2);

  return bgGray(whiteBright(
    ` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours}:${minutes}:${seconds} `
  ));
}

/**
 * Show an error message in the console.
 * 
 * @function
 * @param { string } message Error message.
 * @returns { void }
 */
function error(message: string): void {
  console.log(`${getInfo() + bgRed(whiteBright(' ERROR '))} ${message}`);
}

/**
 * Show an info message in the console.
 * 
 * @function
 * @param { string } message Info message.
 * @returns { void }
 */
function info(message: string): void {
  console.log(`${getInfo() + bgBlue(whiteBright(' INFO '))} ${message}`);
}

/**
 * Show a success message in the console.
 * 
 * @function
 * @param { string } message Success message.
 * @returns { void }
 */
function success(message: string): void {
  console.log(`${getInfo() + bgGreen(whiteBright(' SUCCESS '))} ${message}`);
}

/**
 * Show a status message in the console.
 * 
 * @function
 * @param { string } message Status message.
 * @returns { void } 
 */
function status(message: string): void {
  console.log(`${getInfo() + bgMagenta(whiteBright(' STATUS '))} ${message}`);
}

/**
 * Show a warning message in the console.
 * 
 * @function
 * @param { string } message Warning message.
 * @returns { void }
 */
function warning(message: string): void {
  console.log(`${getInfo() + bgYellow(whiteBright(' WARNING '))} ${message}`);
}

/**
 * Export default values.
 * @exports
 */
export default {
  error,
  info,
  success,
  status,
  warning,
};
