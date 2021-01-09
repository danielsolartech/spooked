/**
 * Copyright (c) Daniel Solarte Chaverra
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import IRoute from "../types/server/IRoute";
import IController from "../types/server/IController";

class Storage {
    private static controllers: IController[] = [];
    private static routes: IRoute[] = [];

    static getControllerByTarget(target: Function): IController | null {
        return this.controllers.find((controller) => controller.target === target) || null;
    }

    static getControllerByName(name: string): IController | null {
        return this.controllers.find((controller) => controller.name === name) || null;
    }

    static addController(controller: IController): boolean {
        if (this.getControllerByName(controller.name) != null) {
            return false;
        }

        this.controllers.push(controller);
        return this.controllers.includes(controller);
    }

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
