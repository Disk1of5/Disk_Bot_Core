// Get docker secrets for sensitive data.
import * as fs from "fs";
import { Logger } from "tslog";

interface iDockerSecrets{
    getSecret(secret:string): string
}

export class DockerSecrets implements iDockerSecrets{
    private logger: Logger;
    constructor(logger: Logger){
        this.logger=logger;
    }
    getSecret(secret: string): string {
        try{
            return fs.readFileSync('/run/secrets/' + secret, 'utf8').trim()
        }catch (e:any) {
            if (e.code !== 'ENOENT') {
                this.logger.info(`Found secret!`);
            } else {
                this.logger.error(`Unable to find ${secret}. Error code: ${e} SOMETHING HAPPEND`,e);
            }
        }
        return "";
    }

}