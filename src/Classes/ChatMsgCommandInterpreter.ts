import { Logger } from "tslog";

export interface iChatMsgCommandInterpreter{
    command: string;
    parameters: Array<string>;
    raw: string;
    hasParameters: boolean;
}

export class ChatMsgCommandInterpreter implements iChatMsgCommandInterpreter{
    command: string;
    parameters: Array<string>;
    raw: string;
    hasParameters:boolean =false;

    constructor(raw:string, logger: Logger) {
        this.raw=raw;
        const regex = /!\w+|\w+|"[^"]+"/g;
        let tmp: Array<string> = Array<string>();
        let msg;
        while ((msg = regex.exec(this.raw)) !== null) {
            if (msg.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            msg.forEach((match, groupIndex) => {
                tmp.push(match.toString());
            });
        }
        this.command=tmp[0];
        tmp.shift();
        this.parameters=tmp;
        if(this.parameters.length>0)this.hasParameters=true;
        if(this.command.substring(0,1)=="!"){
            logger.debug(`Command ${this.command}\n`);
            logger.debug(`Parameters ${this.parameters}\n`);
        }


    }
}