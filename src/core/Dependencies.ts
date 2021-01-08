import LogsManager from "./LogsManager";
import { resolve } from 'path';

class Dependencies {
    static async load(name: string): Promise<any> {
        try {
            const module = await import(name);
            return module;
        } catch (e) {
            try {
                const module = await import(resolve(`${process.cwd()}/node_modules/${name}`));
                return module;
            } catch (e) {
                LogsManager.error(`Cannot find module '${name}'.`);
            }
        }
    }
}

export default Dependencies;