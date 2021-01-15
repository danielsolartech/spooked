/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Storage from '../../core/Storage';

export function Entity(name?: string): ClassDecorator {
	return function (target) {
		name = name ?? target.name;

		Storage.addEntity({
			target,
			name,
		});
	};
}
