import { ChatClient } from "@twurple/chat/lib";
import { Logger } from "tslog"
import { DiskServices } from "./DiskServices";

export interface iChatMsgCommandConstructor{
    getDiskServices(): DiskServices
    getChatClient(): ChatClient
}

export class ChatMsgCommandConstructor implements iChatMsgCommandConstructor{
    private _logger: Logger
    private _diskServices:DiskServices;
    private _chatClient: ChatClient;
    constructor(chatClient: ChatClient, diskServices: DiskServices){
        this._logger=diskServices.getLogger();
        this._diskServices=diskServices;
        this._chatClient=chatClient;
    }
    getDiskServices(): DiskServices {
        return this._diskServices;
    }
    getChatClient(): ChatClient {
        return this._chatClient
    }

}