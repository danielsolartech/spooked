import Storage from "../core/Storage";
import { RouteMethod } from "../types/server/IRoute";

export function Route(method: RouteMethod, name?: string): PropertyDecorator {
    return function(object: Object, propertyKey: string) {
        name = name?.toLowerCase() ?? propertyKey.toLowerCase();

        Storage.addRoute({
            target: object.constructor,
            name,
            original_name: propertyKey,
            method,
        });
    };
}
