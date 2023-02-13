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
const prompts_1 = __importDefault(require("prompts"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const mini_umi_utils_1 = require("@maidang606/mini-umi-utils");
const path_1 = require("path");
const pkg_up_1 = require("@maidang606/shared/compiled/pkg-up");
const fs_extra_2 = require("fs-extra");
const child_process_1 = require("child_process");
const bootstrap = ({ args, cwd }) => __awaiter(void 0, void 0, void 0, function* () {
    const [name] = args._;
    let npmClient = "pnpm";
    let registry = "https://registry.npmjs.org/";
    let appTemplate = "app";
    // const { username, email } = await getGitInfo()
    // let author = email && username ? `${username} <${email}>` : ""
    if (!args.default) {
        const response = yield (0, prompts_1.default)([
            {
                type: "select",
                name: "appTemplate",
                message: "Pick Umi App Template",
                choices: [
                    { title: "Simple App", value: "app" },
                    { title: "Ant Design Pro", value: "max" },
                    { title: "Vue Simple App", value: "vue-app" },
                ],
                initial: 0,
            },
            {
                type: "select",
                name: "npmClient",
                message: "Pick Npm Client",
                choices: [
                    { title: "npm", value: "npm" },
                    { title: "cnpm", value: "cnpm" },
                    { title: "tnpm", value: "tnpm" },
                    { title: "yarn", value: "yarn" },
                    { title: "pnpm", value: "pnpm" },
                ],
                initial: 4,
            },
            {
                type: "select",
                name: "registry",
                message: "Pick Npm Registry",
                choices: [
                    {
                        title: "npm",
                        value: "https://registry.npmjs.org/",
                        selected: true,
                    },
                    { title: "taobao", value: "https://registry.npmmirror.com" },
                ],
            },
        ], {
            onCancel() {
                process.exit(1);
            },
        });
        npmClient = response.npmClient;
        registry = response.registry;
        appTemplate = response.appTemplate;
    }
    const pluginPrompts = [
        {
            name: "name",
            type: "text",
            message: `What's the plugin name?`,
            default: name,
        },
        {
            name: "description",
            type: "text",
            message: `What's your plugin used for?`,
        },
        {
            name: "mail",
            type: "text",
            message: `What's your email?`,
        },
        {
            name: "author",
            type: "text",
            message: `What's your name?`,
        },
        {
            name: "org",
            type: "text",
            message: `Which organization is your plugin stored under github?`,
        },
    ];
    const target = name ? (0, path_1.join)(cwd, name) : cwd;
    const templateName = args.plugin ? "plugin" : appTemplate;
    const version = require("../package").version;
    const monorepoRoot = yield detectMonorepoRoot({ target });
    const inMonorepo = !!monorepoRoot;
    const projectRoot = inMonorepo ? monorepoRoot : target;
    // git
    // const shouldInitGit = args.git !== false;
    const shouldInitGit = false;
    // now husky is not supported in monorepo
    const withHusky = shouldInitGit && !inMonorepo;
    console.log({
        npmClient,
        registry,
        appTemplate,
        name,
        target,
        version,
        projectRoot,
    });
    const generator = new mini_umi_utils_1.BaseGenerator({
        path: (0, path_1.join)(__dirname, "..", "templates", templateName),
        target,
        data: {
            version: version.includes("-canary.") ? version : `^${version}`,
            npmClient,
            registry,
            author: "",
            withHusky,
            // suppress pnpm v7 warning
            extraNpmrc: npmClient === "pnpm" ? `strict-peer-dependencies=false` : "",
        },
        questions: args.default ? [] : args.plugin ? pluginPrompts : [],
    });
    yield generator.run();
    const context = {
        inMonorepo,
        target,
        projectRoot,
    };
    if (!withHusky) {
        yield removeHusky(context);
    }
    if (inMonorepo) {
        // monorepo should move .npmrc to root
        yield moveNpmrc(context);
    }
    // init git
    if (shouldInitGit) {
        yield initGit(context);
    }
    else {
        console.info(`Skip Git init`);
    }
    // install deps
    if (!args.default && args.install !== false) {
        (0, mini_umi_utils_1.installWithNpmClient)({ npmClient, cwd: target });
    }
    else {
        console.info(`Skip install deps`);
    }
});
function detectMonorepoRoot(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { target } = opts;
        const rootPkg = yield (0, pkg_up_1.pkgUp)({ cwd: (0, path_1.dirname)(target) });
        if (!rootPkg)
            return null;
        const rootDir = (0, path_1.dirname)(rootPkg);
        if ((0, mini_umi_utils_1.tryPaths)([
            (0, path_1.join)(rootDir, "lerna.json"),
            (0, path_1.join)(rootDir, "pnpm-workspace.yaml"),
        ])) {
            return rootDir;
        }
        return null;
    });
}
function removeHusky(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = (0, path_1.join)(opts.target, "./.husky");
        if ((0, fs_extra_2.existsSync)(dir)) {
            yield fs_extra_1.default.remove(dir);
        }
    });
}
function initGit(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectRoot } = opts;
        const isGit = (0, fs_extra_2.existsSync)((0, path_1.join)(projectRoot, ".git"));
        if (isGit)
            return;
        const git = (0, child_process_1.spawn)("git", ["init"], { cwd: projectRoot });
        git.stderr.on("data", (data) => {
            console.error(`Initial the git repo failed`);
        });
        git.stdout.on("data", (data) => {
            console.info("Initial the git success");
        });
    });
}
function moveNpmrc(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { target, projectRoot } = opts;
        const sourceNpmrc = (0, path_1.join)(target, "./.npmrc");
        const targetNpmrc = (0, path_1.join)(projectRoot, "./.npmrc");
        if (!(0, fs_extra_2.existsSync)(targetNpmrc)) {
            yield fs_extra_1.default.copyFile(sourceNpmrc, targetNpmrc);
        }
        yield fs_extra_1.default.remove(sourceNpmrc);
    });
}
exports.default = bootstrap;
