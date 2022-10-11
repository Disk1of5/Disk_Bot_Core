import mongoose, { Mongoose } from "mongoose";
import { Logger } from "tslog";
import { DiskConfig } from "./DiskConfig";
import { ExpressJsService, iExpressJsService } from "./ExpressJsService";
import { MongoDBService } from "./MongoDBService";

export interface iDiskServices{
    getLogger(): Logger
    getConfig(): DiskConfig
    getExpressJsService(): iExpressJsService;
    getMongoService(): MongoDBService;
}

export class DiskServices implements iDiskServices{
    private _config : DiskConfig;
    private _logger: Logger;
    private _expressJsService: ExpressJsService;
    private _mongoDBservice: MongoDBService;
    constructor(logger: Logger, expressJsService: ExpressJsService,mongoDBservice: MongoDBService, config: DiskConfig){
        this._logger=logger;
        this._config=config;
        this._mongoDBservice = mongoDBservice;
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

    getMongoService(): MongoDBService {
        return this._mongoDBservice;
    }
    
}