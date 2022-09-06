import { Logger } from "tslog";
import { DiskConfig } from "./DiskConfig";
import { ExpressJsService, iExpressJsService } from "./ExpressJsService";

export interface iDiskServices{
    getLogger(): Logger
    getConfig(): DiskConfig
    getExpressJsService(): iExpressJsService;
}

export class DiskServices implements iDiskServices{
    private _config : DiskConfig;
    private _logger: Logger;
    private _expressJsService: ExpressJsService;
    constructor(logger: Logger, expressJsService: ExpressJsService, config: DiskConfig){
        this._logger=logger;
        this._config=config;
        this._expressJsService=expressJsService;
    }
    getExpressJsService(): iExpressJsService {
        return this._expressJsService;
    }

    getLogger(): Logger {
        return this._logger;
    }
    getConfig(): DiskConfig {
        return this._config
    }
    
}