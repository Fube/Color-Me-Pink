"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var discord_js_1 = require("discord.js");
var colorMe_1 = require("./commands/colorMe");
var _a = process.env, BOT_TOKEN = _a.BOT_TOKEN, PREFIX = _a.PREFIX, COMMAND_OK = _a.COMMAND_OK, COMMAND_NOT_OK = _a.COMMAND_NOT_OK;
var commands = new Map([
    ['colorMe', colorMe_1["default"]],
]);
var client = new discord_js_1.Client();
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var cleanedMessage, bits, _a, commandName, command, commands_1, commands_1_1, _b, name_1, innerCommand;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                // Check to see if the message is mine
                if (message.content.slice(0, PREFIX.length) !== PREFIX)
                    return [2 /*return*/];
                cleanedMessage = message.content.slice(PREFIX.length);
                bits = cleanedMessage.split(' ');
                _a = __read(bits, 1), commandName = _a[0];
                command = commands.get(commandName);
                if (!command) {
                    try {
                        //console.log('There was no command with that exact name')
                        for (commands_1 = __values(commands), commands_1_1 = commands_1.next(); !commands_1_1.done; commands_1_1 = commands_1.next()) {
                            _b = __read(commands_1_1.value, 2), name_1 = _b[0], innerCommand = _b[1];
                            //console.log(innerCommand.aliases)
                            if (innerCommand.aliases.includes(commandName)) {
                                command = innerCommand;
                                break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (commands_1_1 && !commands_1_1.done && (_c = commands_1["return"])) _c.call(commands_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (!command) return [3 /*break*/, 5];
                return [4 /*yield*/, command.core(message, bits)];
            case 1:
                if (!_d.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, message.react(COMMAND_OK)];
            case 2:
                _d.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, message.react(COMMAND_NOT_OK)];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('ready', function () { return console.log('LMG MOUNTED N LOADED'); });
client.login(BOT_TOKEN);
