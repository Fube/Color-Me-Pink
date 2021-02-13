import { client } from "../index";
import { Message } from 'discord.js';
import commands from "../commands";

const {
    PREFIX,
    COMMAND_OK,
    COMMAND_NOT_OK,
} = process.env;

client.on('message', async (message:Message) => {

    // Check to see if the message is mine
    if(message.content.slice(0, PREFIX.length) !== PREFIX)return;

    //console.log('It was mine')

    const cleanedMessage = message.content.slice(PREFIX.length);
    const bits = cleanedMessage.split(' ');
    const [ commandName ] = bits;

    let command = commands.get(commandName);
    if(!command){

        //console.log('There was no command with that exact name')

        for(const [ name, innerCommand ] of commands){

            //console.log(innerCommand.aliases)

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
});
