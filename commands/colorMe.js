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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
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
var Command_1 = require("../classes/Command");
var isValidHex_1 = require("../utilities/isValidHex");
var index_1 = require("../index");
var colorMe = new Command_1["default"]('colorMe', ['cm'], 'Adds a colored role', function (message, bits) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, color, rolesManager, member, memberRoles, maxBotRolePosition, maxPosition, _b, _c, _d, _, role_1, e_1_1, role, roleData, e_2;
    var e_1, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!(bits.length !== 2)) return [3 /*break*/, 2];
                return [4 /*yield*/, message.reply('Too little or too many args')];
            case 1:
                _f.sent();
                return [2 /*return*/, false];
            case 2:
                _a = __read(bits, 2), name = _a[0], color = _a[1];
                if (!!isValidHex_1["default"](color)) return [3 /*break*/, 4];
                return [4 /*yield*/, message.reply('Invalid hex code')];
            case 3:
                _f.sent();
                return [2 /*return*/, false];
            case 4:
                _f.trys.push([4, 19, , 20]);
                return [4 /*yield*/, message.guild.fetch()];
            case 5:
                rolesManager = (_f.sent()).roles;
                member = message.member;
                return [4 /*yield*/, member.fetch(true)];
            case 6:
                memberRoles = (_f.sent()).roles;
                maxBotRolePosition = Math.max.apply(Math, __spread(message.guild.members.cache.find(function (n) { return n.id === index_1.client.user.id; }).roles.cache.map(function (n) { return n.position; })));
                maxPosition = 0;
                _f.label = 7;
            case 7:
                _f.trys.push([7, 13, 14, 15]);
                _b = __values(memberRoles.cache), _c = _b.next();
                _f.label = 8;
            case 8:
                if (!!_c.done) return [3 /*break*/, 12];
                _d = __read(_c.value, 2), _ = _d[0], role_1 = _d[1];
                maxPosition = role_1.position < maxBotRolePosition && Math.max(maxPosition, role_1.position);
                if (!isValidHex_1["default"](role_1.name)) return [3 /*break*/, 11];
                return [4 /*yield*/, member.roles.remove(role_1.id)];
            case 9:
                _f.sent();
                if (!(role_1.members.size - 1 <= 0)) return [3 /*break*/, 11];
                return [4 /*yield*/, role_1["delete"]('No one has this role anymore')];
            case 10:
                _f.sent();
                _f.label = 11;
            case 11:
                _c = _b.next();
                return [3 /*break*/, 8];
            case 12: return [3 /*break*/, 15];
            case 13:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 15];
            case 14:
                try {
                    if (_c && !_c.done && (_e = _b["return"])) _e.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 15:
                role = rolesManager.cache.filter(function (n) { return n.name === color; }).array()[0];
                if (!!role) return [3 /*break*/, 17];
                roleData = {
                    name: color,
                    color: color,
                    position: maxPosition + 1,
                    hoist: true,
                    mentionable: false
                };
                return [4 /*yield*/, rolesManager.create({
                        data: roleData
                    })];
            case 16:
                role = _f.sent();
                _f.label = 17;
            case 17: return [4 /*yield*/, memberRoles.add(role)];
            case 18:
                _f.sent();
                return [2 /*return*/, true];
            case 19:
                e_2 = _f.sent();
                console.log(e_2);
                return [2 /*return*/, false];
            case 20: return [2 /*return*/];
        }
    });
}); });
exports["default"] = colorMe;
