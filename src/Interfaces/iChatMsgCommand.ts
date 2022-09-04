import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { iChatMsgCommandInterpreter } from "../Classes/ChatMsgCommandInterpreter";

export interface iChatMsgCommand{
    init(): void;
    triggered(channel: string, user: string, message: string, msg: TwitchPrivateMessage, chatMsgCommandInterpreter: iChatMsgCommandInterpreter): boolean;
    process(channel: string, user: string, message: string, msg: TwitchPrivateMessage,chatMsgCommandInterpreter: iChatMsgCommandInterpreter):void;
    commandTextHelp?: string;
}