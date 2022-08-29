import { ChatClient } from "@twurple/chat";
import { Logger } from "tslog";
import { DiskConfig } from "./DiskConfig";

export interface iDisk_Bot{
   start():void;
}
export class Disk_Bot implements iDisk_Bot{
    private config: DiskConfig;
    private logger: Logger;
    constructor(config: DiskConfig, logger: Logger) {
        this.config=config;
        this.logger=logger;
    }


    async start() {
        this.logger.info('Starting Bot')
        const authProvider= this.config.getAuthProvider();
        const chatClient = new ChatClient({ authProvider, channels: this.config.twitchChannels });
        try {
            this.logger.debug("Attempting to Connect");
            await chatClient.connect();
        } catch (error) {
            this.logger.error(`Unable to connect Error: ${error}`);
        }
        
        this.logger.info(`Connected to Twich Chat Channels: ${this.config.twitchChannels.toString()}`);

    }

}