import { Mode } from "ircv3/lib/Message/MessageTypes/Commands";
import { Document, Model, Models, Mongoose, Query, Schema } from "mongoose";
import { Logger } from "tslog";
import { MongoDBService } from "./MongoDBService";

export interface iChatUser{
    user: string,
    firstSeenChannel: string,
    lastSeenChannel: string,
    firstSeenTimestamp: Date,
    lastSeenTimestamp: Date,
    lastChatMessage: string;
    streamer: boolean;
}



export interface iChatUserService{
    getActiveUsers() : Promise<Array<Document & iChatUser>>;
    activity(channel: string, user: string, message: string): Promise<void>; 
    findUser(user: string): Promise<Document & iChatUser | null>;  
}
//observer pattern to keep track of listeners
interface iChatUserObserver{
    
}

export interface iChatListener{
    notify(): void;
}
export class ChatUserService implements iChatUserService, iChatUserObserver{
    private _activeUserMS=(1000*60)*10; // 10min
    private _mdb: MongoDBService;
    private _logger: Logger;
    private _chatUser: Model<iChatUser>;
    private _chatUserSchema: Schema;
    constructor(logger: Logger, mongodbService: MongoDBService){
        this._logger= logger;
        this._mdb= mongodbService;
        const m: Mongoose = this._mdb.getMongoose();
    
    const chatUserSchema = new  m.Schema<iChatUser>({
        user: { type: String, required: true },
        firstSeenChannel: { type: String, required: true }, 
        lastSeenChannel: { type: String, required: true }, 
        firstSeenTimestamp: { type: Date, required: true },
        lastSeenTimestamp: { type: Date, required: true },
        lastChatMessage: { type: String, required: false},
        streamer:{type: Boolean, requierd: true}
    })
    this._chatUserSchema = chatUserSchema;
    this._chatUser= m.model<iChatUser>('ChatUser', this._chatUserSchema);  

    }
    async findUser(user: string): Promise<Document & iChatUser | null> {
            
            let u:Document  & iChatUser | null  = await this._chatUser.findOne({user:user});
        return u;
    }

    async getActiveUsers(): Promise<Array<Document & iChatUser>> {
       //query mongodb for users and return users
       const filter={lastSeenTimestamp: {$gt: new Date(Date.now()- this._activeUserMS)}};
       return await this._chatUser.find(filter);
       
       //return this._chatUser.find(`{lastSeenTimestamp: {$gt: new Date(Date.now()- ${this._activeUserMS}}`);
    }
 
    async activity(channel: string, user: string, message: string): Promise<void> {
     // insert user into DB if user doesn't exist
     // if it exists update the records 
   //  const m: Mongoose = this._mdb.getMongoose();
        //find user
        const userExists= await this._chatUser.exists({user: user});
        if(userExists){
            const tmpParams = {
                    lastSeenChannel: channel,
                    lastSeenTimestamp: new Date,
                    lastChatMessage: message
                }
           await this._chatUser.updateOne({user: user},tmpParams);
        }else{
            //new user
            this._logger.info(`Creating new user ${user}`)
            this._chatUser.create({
            user: user,
            firstSeenChannel: channel,
            firstSeenTimestamp: Date(),
            lastSeenChannel: channel,
            lastSeenTimestamp: Date(),
            lastChatMessage: message,
            streamer: false
            });
        }
        
        // for debugging
        // const activeusers:Array<iChatUser>=await this.getActiveUsers();
        // let msg = `There are ${activeusers.length } active users: `;
        // for(let i of activeusers){
        //     msg=msg + `${i.user}, `;
        // }
        // this._logger.debug(msg);
    }

    
}