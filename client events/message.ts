import { Message } from 'discord.js';
import commands from "../commands";
import ClientEventListener from "../classes/ClientEventListener";

const {
    PREFIX,
    COMMAND_OK,
    COMMAND_NOT_OK,
} = process.env;

const messageListener = new ClientEventListener(

    'message',
    async (message:Message) => {

        if(message.content.slice(0, PREFIX.length) !== PREFIX)return;
    
    
        const cleanedMessage = message.content.slice(PREFIX.length);
        const bits = cleanedMessage.split(' ');
        const [ commandName ] = bits;
    
        let command = commands.get(commandName);
        if(!command){
    
            for(const [ name, innerCommand ] of commands){
    
                if(innerCommand.aliases.includes(commandName)){
                    command = innerCommand;
                    break;
                }
            }
        }
    
        if(command){
    
           if(await command.core(message, bits))
               await message.react(COMMAND_OK);
           else
               await message.react(COMMAND_NOT_OK);
        }
    }
);

export default messageListener;