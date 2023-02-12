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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const generator_1 = require("./generator");
const fs_extra_2 = __importDefault(require("fs-extra"));
class BaseGenerator extends generator_1.Generator {
    constructor({ path, target, data, questions, baseDir }) {
        super({ baseDir: baseDir || target, args: data });
        this.path = path;
        this.target = target;
        this.data = data;
        this.questions = questions || [];
    }
    prompting() {
        return this.questions;
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const context = Object.assign(Object.assign({}, this.data), this.prompts);
            if ((0, fs_extra_1.statSync)(this.path).isDirectory()) {
                this.copyDirectory({
                    context,
                    path: this.path,
                    target: this.target,
                });
            }
            else {
                if (this.path.endsWith('.tpl')) {
                    this.copyTpl({
                        templatePath: this.path,
                        target: this.target,
                        context,
                    });
                }
                else {
                    const absTarget = this.target;
                    fs_extra_2.default.mkdirpSync((0, path_1.dirname)(absTarget));
                    (0, fs_extra_1.copyFileSync)(this.path, absTarget);
                }
            }
        });
    }
}
exports.default = BaseGenerator;
