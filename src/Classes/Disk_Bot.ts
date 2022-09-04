import { AuthProvider } from "@twurple/auth/lib";
import { ChatClient, PrivateMessage, toUserName } from "@twurple/chat";
import { Logger } from "tslog";
import { iPluginChatMsgCommands } from "../Interfaces/PluginChatMsgCommands";
import { DiskConfig } from "./DiskConfig";
import { DiskServices } from "./DiskServices";

export interface iDisk_Bot{
   start():void
   loadPlugins(plugins: iPluginChatMsgCommands):void
   getChatClient(): ChatClient
}
export class Disk_Bot implements iDisk_Bot{
    private _config: DiskConfig;
    private _logger: Logger;
    private _pluginChatMsgCommands!: iPluginChatMsgCommands;
    private _authProvider: AuthProvider;
    private _chatClient: ChatClient;
    constructor(diskServices: DiskServices) {
    
        this._config=diskServices.getConfig();
        this._logger=diskServices.getLogger();
        this._authProvider = this._config.getAuthProvider();
        const authProvider = this._authProvider;
        this._chatClient = new ChatClient({ authProvider, channels: this._config.twitchChannels });
    }
    getChatClient(): ChatClient{
        return this._chatClient;
    }
    loadPlugins(pluginChatMsgCommands: iPluginChatMsgCommands): void {
        this._pluginChatMsgCommands=pluginChatMsgCommands;
        this._logger.info("Loading Plugins");
        for(let command of this._pluginChatMsgCommands.commands.getChatCommands){
            command.init();
        }
    }


    async start() {
        this._logger.info('Starting Bot')
        try {
            this._logger.debug("Attempting to Connect");
            await this._chatClient.connect();
        } catch (error) {
            this._logger.error(`Unable to connect Error: ${error}`);
        }
        this._logger.info(`Connected to Twich Chat`);
        this._chatClient.onJoin((channel)=>{
            this._logger.debug(`Joined ${channel}`);
        });

        
        this._chatClient.onMessage((channel: string, user: string, message: string, msg:  PrivateMessage)=>{
            this._pluginChatMsgCommands.commands.processChatMsgCommands(channel,user,message,msg, this._logger);
        });

    }

    

}