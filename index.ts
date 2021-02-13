import * as dotenv from 'dotenv';
dotenv.config();

import { Client, Intents } from 'discord.js';
import eventListeners from './client events';

const {
    BOT_TOKEN,
} = process.env;

export const client = new Client({ 
    ws: { 
        intents: Intents.ALL
    } 
});

// Hook up event listeners
eventListeners.forEach(
    ({ event, listener }) => client.on(event, listener)
);

client.on('ready', () => console.log('LMG MOUNTED N LOADED'));

client.login(BOT_TOKEN);