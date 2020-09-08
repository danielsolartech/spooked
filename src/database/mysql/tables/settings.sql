/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/* CREATE TABLE */
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
  value VARCHAR(255) NOT NULL,
  description VARCHAR(1000)
);

/* TRUNCATE TABLE */
TRUNCATE TABLE settings;

/* DEFAULT VALUES */
INSERT INTO settings VALUES
  ('site.host', 'localhost', 'Host of your website.'),
  ('site.port', '3000', 'Port of your website.'),
  ('site.url', 'http://localhost:3000/', 'URL of your website with "/" at the end.'),
  ('site.name', 'SpookedCMS', 'Name of your website.'),
  ('site.theme', 'default', 'Theme of your website.');
