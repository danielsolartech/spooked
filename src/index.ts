/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import 'module-alias/register';
import * as spooked from '@Spooked';
import logs from '@Core/logs';

try {
  spooked.start();
} catch (e) {
  logs.error(e);
}
