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
exports.Generator = void 0;
const chalk_1 = __importDefault(require("@maidang606/shared/compiled/chalk"));
const fs_1 = require("fs");
const path_1 = require("path");
const prompts_1 = __importDefault(require("@maidang606/shared/compiled/prompts"));
const fs_extra_1 = __importDefault(require("@maidang606/shared/compiled/fs-extra"));
const mustache_1 = __importDefault(require("@maidang606/shared/compiled/mustache"));
const glob_1 = __importDefault(require("@maidang606/shared/compiled/glob"));
class Generator {
    constructor({ baseDir, args }) {
        this.baseDir = baseDir;
        this.args = args;
        this.prompts = {};
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = this.prompting();
            this.prompts = yield (0, prompts_1.default)(questions, {
                onCancel() {
                    process.exit(1);
                },
            });
            yield this.writing();
        });
    }
    prompting() {
        return [];
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    copyTpl(opts) {
        const tpl = (0, fs_1.readFileSync)(opts.templatePath, "utf-8");
        const content = mustache_1.default.render(tpl, opts.context);
        fs_extra_1.default.mkdirpSync((0, path_1.dirname)(opts.target));
        console.log(`${chalk_1.default.green("Write:")} ${(0, path_1.relative)(this.baseDir, opts.target)}`);
        (0, fs_1.writeFileSync)(opts.target, content, "utf-8");
    }
    copyDirectory(opts) {
        const files = glob_1.default.sync("**/*", {
            cwd: opts.path,
            dot: true,
            ignore: ["**/node_modules/**"],
        });
        files.forEach((file) => {
            const absFile = (0, path_1.join)(opts.path, file);
            if ((0, fs_1.statSync)(absFile).isDirectory())
                return;
            if (file.endsWith(".tpl")) {
                this.copyTpl({
                    templatePath: absFile,
                    target: (0, path_1.join)(opts.target, file.replace(/\.tpl$/, "")),
                    context: opts.context,
                });
            }
            else {
                console.log(`${chalk_1.default.green("Copy: ")} ${file}`);
                const absTarget = (0, path_1.join)(opts.target, file);
                fs_extra_1.default.mkdirpSync((0, path_1.dirname)(absTarget));
                (0, fs_1.copyFileSync)(absFile, absTarget);
            }
        });
    }
}
exports.Generator = Generator;
