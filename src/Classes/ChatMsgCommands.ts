
import { PrivateMessage } from "@twurple/chat/lib"
import { Logger } from "tslog"
import { iChatMsgCommand } from "../Interfaces/iChatMsgCommand"
import { ChatMsgCommandConstructor } from "./ChatMsgCommandConstructor"
import { ChatMsgCommandInterpreter } from "./ChatMsgCommandInterpreter"
export interface iChatMsgCommands{
    getChatCommands: Array<iChatMsgCommand>
    addChatMsgCommands(chatPlugin: iChatMsgCommand): void
    processChatMsgCommands(channel: string, user: string, message: string, PrivateMessage: PrivateMessage, logger: Logger): void
}

export class ChatMessageCommands implements iChatMsgCommands{
    private logger: Logger;
    constructor(logger: Logger){
        this.logger= logger;
    }
    processChatMsgCommands(channel: string, user: string, message: string,  privateMessage: PrivateMessage, logger: Logger): void {
        const chatMsgCommandInterpreter = new ChatMsgCommandInterpreter(message, logger)
        for(let command of this.getChatCommands){
            if(command.triggered(channel, user, message, privateMessage,chatMsgCommandInterpreter)){
                command.process(channel, user, message, privateMessage,chatMsgCommandInterpreter);
            }
        }
    }
    getChatCommands: iChatMsgCommand[] = []
    public addChatMsgCommands(chatMsgCommand: iChatMsgCommand) {
        this.getChatCommands.push(chatMsgCommand)
    }

}