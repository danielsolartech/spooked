/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

export interface ISettingDatabase {
  type: 'mysql' | 'mongodb';
  host: string;
  port: number;
  user: string;
  password: string;
  name?: string;
}

export default interface ISettingFile {
  database: ISettingDatabase;
}
