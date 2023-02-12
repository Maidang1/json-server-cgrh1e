"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const args = (0, yargs_parser_1.default)(process.argv.slice(2), {
    alias: {
        version: ['v'],
        help: ['h'],
    },
    boolean: ['version'],
});
require('./').default({ cwd: process.cwd(), args });
