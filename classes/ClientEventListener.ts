import { ClientEvents } from "discord.js";

export default class ClientEventListener<K extends keyof ClientEvents>{

    constructor(
        public event: K,
        public listener: (...args:ClientEvents[typeof event]) => void | Promise<void>
    ){
        this.event = event;
        this.listener = listener;
    }
}