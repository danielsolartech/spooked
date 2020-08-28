/**
 * Copyright (c) Daniel Solarte Chaverra
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @format
 */

import { Schema, model, Document } from 'mongoose';

/**
 * Setting document interface.
 * @interface
 */
interface ISetting extends Document {
  /**
   * Setting name.
   * @public
   */
  key: string;

  /**
   * Setting value.
   * @public
   */
  value: string;

  /**
   * Setting description.
   * @public
   */
  description: string;
}

/**
 * Settings document schema.
 * @constant
 */
const settingSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  description: String,
});

/**
 * Create the model from the settings schema.
 * @constant
 */
const settingModel = model<ISetting>('setting', settingSchema);

/**
 * Insert default values to the settings document.
 * @function
 * @async
 * @returns { Promise<Document[]> }
 */
async function insert_default_values(): Promise<Document[]> {
  return await settingModel.insertMany([
    {
      key: 'site.host',
      value: 'localhost',
      description: 'Host of your website.',
    },
    {
      key: 'site.port',
      value: '3000',
      description: 'Port of your website.',
    },
    {
      key: 'site.url',
      value: 'http://localhost:3000/',
      description: 'URL of your website with "/" at the end.',
    },
    {
      key: 'site.name',
      value: 'SpookedCMS',
      description: 'Name of your website.',
    },
    {
      key: 'site.theme',
      value: 'default',
      description: 'Theme of your website.',
    },
  ]);
}

/**
 * Export default values.
 * @exports
 */
export default {
  model: settingModel,
  insert_default_values,
};
