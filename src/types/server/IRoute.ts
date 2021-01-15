/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface IRoute {
	target: Function;
	name: string;
	original_name: string;
	method: RouteMethod;
}

export default IRoute;
