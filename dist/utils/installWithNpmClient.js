"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installWithNpmClient = void 0;
const child_process_1 = require("child_process");
const installWithNpmClient = ({ npmClient, cwd, }) => {
    const npmCli = (0, child_process_1.spawnSync)(npmClient, [npmClient === 'yarn' ? '' : 'install'], {
        cwd,
        stdio: 'inherit',
    });
    if (npmCli.error) {
        throw new Error(`${npmClient} init error`);
    }
};
exports.installWithNpmClient = installWithNpmClient;
