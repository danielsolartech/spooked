/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import ServerManager from '../server/ServerManager';
import DatabaseManager from '../database/DatabaseManager';
import { GeneralSettings } from '../types/GeneralSettings';
import { Server } from 'http';

export class Spooked {
    private database: DatabaseManager;
    private server: ServerManager;

    /**
     * Generate a new Spooked object.
     *
     * @constructor
     * @param { GeneralSettings } settings
     */
    constructor(private readonly settings: GeneralSettings) {
        this.database = new DatabaseManager(this, settings.database);
        this.server = new ServerManager(this, settings.server);
    }

    getDatabase(): DatabaseManager {
        return this.database;
    }

    getServer(): ServerManager {
        return this.server;
    }

    /**
     * Generate an async/await time out.
     *
     * @static
     * @async
     * @function
     * @param { number } miliseconds
     * @returns { Promoise<void> }
     */
    static async sleep(miliseconds: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, miliseconds));
    }
}
