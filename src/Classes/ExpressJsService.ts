import express, { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Logger } from "tslog";

export interface iExpressJsService{
    getService() : express.Application;
    getPort(): Number;
    addRoute(path: string, requestHandler: RequestHandler): void;
}
export class ExpressJsService implements iExpressJsService {
    //TODO: to place in configs in .env
    private _port: number = 8069
    private _app: express.Application;
    private _logger: Logger;
    constructor(logger: Logger){
        this._logger=logger;
        this._app=express();
        const cors = require('cors')
        this._app.use(cors());
        this._app.listen(this._port,()=>{
            this._logger.debug(`Express JS Service Starting on Port ${this._port}`);
        });                
    }
    addRoute(path: string, requestHandler: express.RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): void {
        this._app.get(path, requestHandler);
    }
    getPort(){
        return this._port
    };
    
    getService(): express.Application {
        return this._app;
    }

    


}