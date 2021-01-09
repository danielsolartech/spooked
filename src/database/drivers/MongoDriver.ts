/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { MongoDBSettings } from "../../types/GeneralSettings";
import Driver from "./Driver";
import Dependencies from "../../core/Dependencies";

class MongoDriver implements Driver {
    private connection: any;
    private db_client: any;
    private db_connection: any;

    constructor(private settings: MongoDBSettings) {
        this.connection = null;
        this.db_client = null;
        this.db_connection = null;
    }

    getConnection(): any {
        return [this.db_client, this.db_connection];
    }

    private _getConnectionUrl(): string {
        let url: string = 'mongodb://';

        if (this.settings.username.length) {
            if (!this.settings.password.length) {
                throw new Error('You must enter the database password.');
            }

            url += `${this.settings.username}:${this.settings.password}@`;
        }

        if (!this.settings.host.length) {
            throw new Error('You must enter the database host.');
        }

        if (this.settings.port <= 0) {
            throw new Error('You must enter a valid database port.');
        }

        url += `${this.settings.host}:${this.settings.port}`;

        return url;
    }

    async loadConnection(): Promise<void> {
        this.connection = await Dependencies.load('mongodb');

        if (this.connection != null) {
            const MongoClient = this.connection.MongoClient;
            this.db_client = new MongoClient(this._getConnectionUrl());
        }
    }

    connect(): Promise<void> {
        if (this.connection == null || this.db_client == null) {
            return;
        }

        return new Promise((resolve, reject) => {
            this.db_connection.connect((error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                this.db_connection = this.db_client.db(this.settings.name);
                resolve();
            });
        });
    }
}

export default MongoDriver;
