import { IController } from "../types/IController";

class Storage {
    private static controllers: IController[] = [];

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
}

export default Storage;
