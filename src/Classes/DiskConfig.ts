import { StaticAuthProvider } from "@twurple/auth";
import { Logger } from "tslog";
import {DockerSecrets} from "./DockerSecrets"

export interface iDiskConfig{
    twitchChannels: Array<string>;
    dbUserName: string;
    dbPassword: string;
    dbHost: string;
    dbDatabase:string;
    getAuthProvider(): StaticAuthProvider;
}

export class DiskConfig implements iDiskConfig{
    dbHost: string;
    dbPassword: string;
    dbUserName: string;
    dbDatabase: string;
    private twitchClientID: string;
    private twitchAccessToken: string;
    private authProvider: StaticAuthProvider;
    twitchChannels: Array<string>;

    constructor(path: string, logger: Logger) {
        let dockerSecrets = new DockerSecrets(logger);
        require('dotenv').config({path:path});
        this.twitchClientID=process.env.TWITCH_CLIENT_ID as string;
        this.twitchAccessToken=process.env.TWITCH_ACCESS_TOKEN as string;
        const twitChannels=process.env.TWITCH_CHANNELS as string;
        this.twitchChannels=twitChannels.split(",") as Array<string>;
        this.dbHost=process.env.DB_HOST as string;
        this.dbUserName=process.env.DB_USERNAME as string;
        this.dbPassword=process.env.MYSQL_ROOT_PASSWORD as string;
        this.dbDatabase=process.env.DB_DATABASE as string;

        //load secrets if env vars are empty
        if(this.twitchClientID===undefined) {
            console.log("No ENV twitchClientID, Using Secret")
            this.twitchClientID=dockerSecrets.getSecret("twitchClientID");
        }

        if(this.twitchAccessToken===undefined) {
            console.log("No ENV twitchAccessToken Found, Using Secret")
            this.twitchAccessToken=dockerSecrets.getSecret("twitchAccessToken");
        }
        
        if(this.dbPassword===undefined) {
            console.log("No db Env Password Found, Using Secret")
            this.dbPassword=dockerSecrets.getSecret("MYSQL_ROOT_PASSWORD");
        }
        this.authProvider=new StaticAuthProvider(this.twitchClientID,this.twitchAccessToken);
    }

    public getAuthProvider(){
        return this.authProvider;
    }
}