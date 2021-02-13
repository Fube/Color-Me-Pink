import ClientEventListener from "../classes/ClientEventListener";
import { syncWithDB as gmuSyncWithDB } from "./guildMemberUpdate";
import { syncWithDB as rdSyncWithDB } from "./roleDelete";
import { commandCaller } from "./message";

const eventListeners: Array<ClientEventListener<any>> = [

    gmuSyncWithDB,
    rdSyncWithDB,
    commandCaller,
];

export default eventListeners;