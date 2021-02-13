import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'discord.js';
import eventListeners from './client events';

const {
    BOT_TOKEN,
} = process.env;

export const client = new Client({ 
    ws: { 
        intents: ['GUILD_PRESENCES', 'GUILD_MEMBERS'] 
    } 
});

// Hook up event listeners
eventListeners.forEach(
    ({ event, listener }) => (console.log(event), client.on(event, listener))
);

client.on('ready', () => console.log('LMG MOUNTED N LOADED'));

client.login(BOT_TOKEN);