import { Logger } from "tslog";
import { ChatMsgCommandConstructor } from "./Classes/ChatMsgCommandConstructor";
import { ChatUserService } from "./Classes/ChatUserService";
import { DiskConfig } from "./Classes/DiskConfig";
import { DiskServices } from "./Classes/DiskServices";
import { Disk_Bot } from "./Classes/Disk_Bot";
import { ExpressJsService } from "./Classes/ExpressJsService";
import { MongoDBService } from "./Classes/MongoDBService";
import { PluginChatMsgCommands } from "./Disk_Bot_Plugins/PluginChatMsgCommands";
let logger = new Logger();
let config=new DiskConfig('./credentials.env', logger);
let expressJsService=new ExpressJsService(logger);
let mongoDBService= new MongoDBService(logger);
let chatUserService = new ChatUserService(logger, mongoDBService);
let diskServices=new DiskServices(logger,expressJsService,mongoDBService,chatUserService, config);
let disk_bot= new Disk_Bot(diskServices);

let chatMsgCommandConstructor=  new ChatMsgCommandConstructor(disk_bot.getChatClient(),diskServices);
disk_bot.loadChatPlugins(new PluginChatMsgCommands(chatMsgCommandConstructor,logger));
disk_bot.start();
