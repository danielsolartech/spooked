import Storage from "../core/Storage";

export function Controller(name?: string): ClassDecorator {
    return function (target) {
        name = name?.toLowerCase() ?? target.name.toLowerCase();

        Storage.addController({
            target,
            name,
        });
    };
}
