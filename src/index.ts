/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import 'module-alias/register';
import Spooked from '@Spooked';
import Logs from '@Core/logs';

try {
  Spooked.initialize();
} catch (e) {
  Logs.error(e);
}
