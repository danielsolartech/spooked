/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import IRoute from '../types/server/IRoute';
import IController from '../types/server/IController';
import IEntity from '../types/database/IEntity';

class Storage {
	private static entities: IEntity[] = [];

	static getEntityByTarget(target: Function): IEntity | null {
		return this.entities.find((entity) => entity.target === target) || null;
	}

	static getEntityByName(name: string): IEntity | null {
		return this.entities.find((entity) => entity.name === name) || null;
	}

	static addEntity(entity: IEntity): boolean {
		if (this.getEntityByName(entity.name) != null) {
			return false;
		}

		this.entities.push(entity);
		return this.entities.includes(entity);
	}

	private static controllers: IController[] = [];

	static getControllerByTarget(target: Function): IController | null {
		return (
			this.controllers.find(
				(controller) => controller.target === target,
			) || null
		);
	}

	static getControllerByName(name: string): IController | null {
		return (
			this.controllers.find((controller) => controller.name === name) ||
			null
		);
	}

	static addController(controller: IController): boolean {
		if (this.getControllerByName(controller.name) != null) {
			return false;
		}

		this.controllers.push(controller);
		return this.controllers.includes(controller);
	}

	private static routes: IRoute[] = [];

	static getRoutesByTarget(target: Function): IRoute[] {
		return this.routes.filter((route) => route.target === target);
	}

	static getRouteByName(name: string): IRoute | null {
		return this.routes.find((route) => route.name === name) || null;
	}

	static addRoute(route: IRoute): boolean {
		if (this.getRouteByName(route.name) != null) {
			return false;
		}

		this.routes.push(route);
		return this.routes.includes(route);
	}
}

export default Storage;
