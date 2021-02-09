import * as dotenv from 'dotenv';
dotenv.config();

import { Client, Message } from 'discord.js';
import Command from './classes/Command';
import colorMe from './commands/colorMe';

const {
    BOT_TOKEN,
    PREFIX,
    COMMAND_OK,
    COMMAND_NOT_OK,
} = process.env;

const commands : Map<string, Command> = new Map([
    ['colorMe', colorMe],
]);

const client = new Client();
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

client.on('ready', () => console.log('LMG MOUNTED N LOADED'));

client.login(BOT_TOKEN);