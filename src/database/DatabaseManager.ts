/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Dependencies from "../core/Dependencies";
import { DatabaseSettings } from "types/GeneralSettings";
import LogsManager from "../core/LogsManager";
import { Spooked } from "../core/Spooked";
import Driver from "./drivers/Driver";
import MySQLDriver from "./drivers/MySQLDriver";

class DatabaseManager {
    private connection: Driver | null;

    constructor(
        private readonly spooked: Spooked,
        private readonly settings: DatabaseSettings,
    ) {
        this.connection = null;
    }

    async connect(): Promise<DatabaseManager> {
        try {
            LogsManager.status('Database connection is starting...');

            if (this.settings.type === 'mysql') {
                this.connection = new MySQLDriver(this.settings);
            }

            if (this.connection == null) {
                throw new Error('Database connection failed!');
            }

            await this.connection.loadConnection();
            await this.connection.connect();

            LogsManager.success('Database connected!');

            return this;
        } catch (e) {
            LogsManager.showError(e);
        }
    }
}

export default DatabaseManager;
