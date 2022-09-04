import { Logger } from "tslog";
import { DiskConfig } from "./DiskConfig";

export interface iDiskServices{
    getLogger(): Logger
    getConfig(): DiskConfig
}

export class DiskServices implements iDiskServices{
    private _config : DiskConfig;
    private _logger: Logger;
    constructor(logger: Logger, config: DiskConfig){
        this._logger=logger;
        this._config=config;
        
    }

    getLogger(): Logger {
        return this._logger;
    }
    getConfig(): DiskConfig {
        return this._config
    }
    
}