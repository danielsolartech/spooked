/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Storage from '../../core/Storage';
import { RouteMethod } from '../../types/server/IRoute';

export function Route(method: RouteMethod, name?: string): PropertyDecorator {
	return function (object: Object, propertyKey: string) {
		name = name?.toLowerCase() ?? propertyKey.toLowerCase();

		Storage.addRoute({
			target: object.constructor,
			name,
			original_name: propertyKey,
			method,
		});
	};
}
