import { Logger } from "tslog";
import { DiskConfig } from "./Classes/DiskConfig";
import { Disk_Bot } from "./Classes/Disk_Bot";
let logger = new Logger();
let config=new DiskConfig('./credentials.env', logger);
let disk_bot= new Disk_Bot(config, logger);
disk_bot.start();