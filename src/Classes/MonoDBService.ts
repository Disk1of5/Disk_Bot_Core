import { Mongoose } from "mongoose";
import { Logger } from "tslog";

export interface iMongoDBService{
    getService(): Mongoose
}
export class MongoDBService implements iMongoDBService{
    private _mdb: Mongoose;
    private _logger: Logger;
    constructor(logger: Logger){
        this._mdb= new Mongoose;
        this._logger= logger;
        try{
        this._mdb.connect("http://localhost:2217/disk_bot");
        this._logger.debug("Connection Successfull");
        }catch(e){
            this._logger.error(`Unable to connect to Mongodb due to ${e}`);
        }
        
        
    }
    getService(): typeof import("mongoose") {
        return this._mdb;
    }

}