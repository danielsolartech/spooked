/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

interface RequiredDatabaseSettings {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
}

export interface MySQLSettings extends RequiredDatabaseSettings {
    type: 'mysql';
}

export interface MongoDBSettings extends RequiredDatabaseSettings {
    type: 'mongodb';
}

export type DatabaseSettings = MySQLSettings | MongoDBSettings;

interface CorsOptions {
    origin: string | string[];
}

export interface ServerSettings {
    host: string;
    port: number;

    cors?: CorsOptions;

    controllers?: Function[];
}

export interface GeneralSettings {
    database: DatabaseSettings;
    server: ServerSettings;
}
