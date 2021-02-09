"use strict";
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
exports.__esModule = true;
var Command = /** @class */ (function () {
    function Command() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var _a = args[0], name_1 = _a.name, aliases = _a.aliases, description = _a.description, core = _a.core;
            this.name = name_1;
            this.aliases = aliases;
            this.description = description;
            this.core = core;
        }
        else if (args.length === 4) {
            var _b = __read(args, 4), name_2 = _b[0], aliases = _b[1], description = _b[2], core = _b[3];
            this.name = name_2;
            this.aliases = aliases;
            this.description = description;
            this.core = core;
        }
        else {
            throw new Error("Invalid construction");
        }
    }
    return Command;
}());
exports["default"] = Command;
