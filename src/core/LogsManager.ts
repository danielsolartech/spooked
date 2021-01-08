/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { bgBlue, bgGray, bgGreen, bgMagenta, bgRed, bgYellow, whiteBright } from "chalk";

class LogsManager {
    /**
     * Get the date information as '(day)/(month)/(year) (hours):(minutes):(seconds)'.
     *
     * @private
     * @static
     * @function
     * @returns { string }
     */
    private static _getInfo(): string {
        const date: Date = new Date(Date.now());
        const hours: string = `0${date.getHours()}`.substr(-2);
        const minutes: string = `0${date.getMinutes()}`.substr(-2);
        const seconds: string = `0${date.getSeconds()}`.substr(-2);

        return bgGray(whiteBright(` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours}:${minutes}:${seconds} `));
    }

    /**
     * Show an error message in the console.
     *
     * @static
     * @function
     * @param { string } message Error message.
     * @returns { void }
     */
    static error(message: string): void {
        console.log(`${this._getInfo() + bgRed(whiteBright(' ERROR '))} ${message}`);
    }

    static showError(error: any): void {
        if (error instanceof Error) {
            this.error(error.message);
        } else if (typeof error === 'string') {
            this.error(error);
        }
    }

    /**
     * Show an info message in the console.
     *
     * @static
     * @function
     * @param { string } message Info message.
     * @returns { void }
     */
    static info(message: string): void {
        console.log(`${this._getInfo() + bgBlue(whiteBright(' INFO '))} ${message}`);
    }

    /**
     * Show a success message in the console.
     *
     * @static
     * @function
     * @param { string } message Success message.
     * @returns { void }
     */
    static success(message: string): void {
        console.log(`${this._getInfo() + bgGreen(whiteBright(' SUCCESS '))} ${message}`);
    }

    /**
     * Show a status message in the console.
     *
     * @static
     * @function
     * @param { string } message Status message.
     * @returns { void } 
     */
    static status(message: string): void {
        console.log(`${this._getInfo() + bgMagenta(whiteBright(' STATUS '))} ${message}`);
    }

    /**
     * Show a warning message in the console.
     *
     * @static
     * @function
     * @param { string } message Warning message.
     * @returns { void }
     */
    static warning(message: string): void {
        console.log(`${this._getInfo() + bgYellow(whiteBright(' WARNING '))} ${message}`);
    }
}

export default LogsManager;
