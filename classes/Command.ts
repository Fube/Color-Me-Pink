import { Message } from "discord.js";

interface CommandResolvable {
    name: string;
    aliases?: Array<string>;
    description?: string;
    core: (message: Message, bits: Array<string>) => Promise<Boolean> | Boolean;
}

export default class Command {

    public name: string;
    public aliases: Array<string>;
    public description: string;
    public core: (message: Message, bits: Array<string>) => Promise<Boolean> | Boolean;

    constructor({ name, aliases, description, core } : CommandResolvable);
    constructor(name:string, aliases:Array<string>, description:string, core:(message:Message, bits:Array<string>) => Promise<Boolean> | Boolean);
    constructor(...args:Array<any>){

        if(args.length === 1){

            const { name, aliases, description, core } : CommandResolvable = args[0];
            this.name = name;
            this.aliases = aliases;
            this.description = description;
            this.core = core;
        }
        else if(args.length === 4){

            const [ name, aliases, description, core ] = args;
            this.name = name;
            this.aliases = aliases;
            this.description = description;
            this.core = core;
        }
        else{
            throw new Error("Invalid construction");
        }
    }
}