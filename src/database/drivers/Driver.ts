/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

interface Driver {
	getConnection(): any;
	loadConnection(): Promise<void>;
	connect(): Promise<void>;
}

export default Driver;
