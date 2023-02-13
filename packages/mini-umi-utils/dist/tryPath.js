"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryPaths = void 0;
const fs_1 = require("fs");
function tryPaths(paths) {
    for (const path of paths) {
        if ((0, fs_1.existsSync)(path))
            return path;
    }
}
exports.tryPaths = tryPaths;
