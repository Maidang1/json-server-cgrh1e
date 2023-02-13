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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitInfo = void 0;
const execa_1 = require("execa");
const getGitInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [{ stdout: username }, { stdout: email }] = yield Promise.all([
            (0, execa_1.command)("git config --global user.name"),
            (0, execa_1.command)("git config --global user.email"),
        ]);
        return { username, email };
    }
    catch (e) {
        return {
            username: "",
            email: "",
        };
    }
});
exports.getGitInfo = getGitInfo;
