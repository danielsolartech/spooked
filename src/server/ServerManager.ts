import LogsManager from '../core/LogsManager';
import { Spooked } from '../core/Spooked';
import Express from 'express';
import { ServerSettings } from '../types/GeneralSettings';
import Cors from 'cors';
import Storage from '../core/Storage';
class ServerManager {
    private app: Express.Express;

    constructor(
        private readonly spooked: Spooked,
        private readonly settings: ServerSettings,
    ) {
        this.app = Express();

        this._loadSettings();
    }

    private _loadSettings(): void {
        if (this.settings.cors) {
            this.app.use(Cors({
                origin: (origin, callback) => {
                    if (this.settings.cors.origin.includes(origin) || origin === '*') {
                        callback(null, true);
                    } else {
                        callback(new Error('Not allowed by CORS.'));
                    }
                },
            }));
        }

        if (this.settings.controllers) {
            this.settings.controllers.forEach((controller) => console.log(Storage.getControllerByTarget(controller)));
        }
    }

    listen(): Promise<void> {
        return new Promise((resolve) => {
            this.app.listen(this.settings.port, this.settings.host, () => {
                resolve();

                LogsManager.success(`Server initialized on ${this.settings.host}:${this.settings.port}`);
            });
        });
    }
}

export default ServerManager;
