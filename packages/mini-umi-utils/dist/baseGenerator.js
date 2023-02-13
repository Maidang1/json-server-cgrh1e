"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGenerator = void 0;
const fs_extra_1 = __importStar(require("@maidang606/shared/compiled/fs-extra"));
const path_1 = require("path");
const generator_1 = require("./generator");
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
                if (this.path.endsWith(".tpl")) {
                    this.copyTpl({
                        templatePath: this.path,
                        target: this.target,
                        context,
                    });
                }
                else {
                    const absTarget = this.target;
                    fs_extra_1.default.mkdirpSync((0, path_1.dirname)(absTarget));
                    (0, fs_extra_1.copyFileSync)(this.path, absTarget);
                }
            }
        });
    }
}
exports.BaseGenerator = BaseGenerator;
