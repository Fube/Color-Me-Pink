import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'discord.js';

const {
    BOT_TOKEN,
} = process.env;

export const client = new Client();

client.on('ready', () => console.log('LMG MOUNTED N LOADED'));

client.login(BOT_TOKEN);