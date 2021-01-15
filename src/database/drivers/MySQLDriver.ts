/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Driver from './Driver';
import { MySQLSettings } from '../../types/GeneralSettings';
import Dependencies from '../../core/Dependencies';

class MySQLDriver implements Driver {
	private connection: any;

	constructor(private settings: MySQLSettings) {
		this.connection = null;
	}

	getConnection(): any {
		return this.connection;
	}

	async loadConnection(): Promise<void> {
		this.connection = (await Dependencies.load('mysql')).createConnection({
			host: this.settings.host,
			port: this.settings.port,
			user: this.settings.username,
			password: this.settings.password,
			database: this.settings.name,
		});
	}

	connect(): Promise<void> {
		if (this.connection == null) {
			return;
		}

		return new Promise((resolve, reject) => {
			this.connection.connect((error: any) => {
				if (error) {
					reject(error);
					return;
				}

				resolve();
			});
		});
	}
}

export default MySQLDriver;
