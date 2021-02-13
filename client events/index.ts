import ClientEventListener from "../classes/ClientEventListener";
import { syncWithDB } from "./guildMemberUpdate";
import { commandCaller } from "./message";

const eventListeners: Array<ClientEventListener<any>> = [

    syncWithDB,
    commandCaller,
];

export default eventListeners;