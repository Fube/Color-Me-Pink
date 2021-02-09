"use strict";
exports.__esModule = true;
var PATTERN = /^#[0-9A-F]{6}$/i;
exports["default"] = (function (hex) { return PATTERN.test(hex); });
