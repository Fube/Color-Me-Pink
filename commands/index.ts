import Command from "../classes/Command";
import colorMe from "./colorMe";

const commands : Map<string, Command> = new Map([
    ['colorMe', colorMe],
]);

export default commands;