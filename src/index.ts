import type yParser from 'yargs-parser';
import prompts from 'prompts';
import { getGitInfo } from './utils/getGitInfo';
import { dirname, join } from 'path';
import { pkgUp } from '../compiled/pkg-up';
import { tryPaths } from './utils/tryPath';
import BaseGenerator from './utils/baseGenerator';
import G from 'glob';
export type NpmClient = 'npm' | 'cnpm' | 'tnpm' | 'yarn' | 'pnpm';
interface Bootstraptype {
  cwd: string;
  args: IArgs;
}

interface IArgs extends yParser.Arguments {
  default?: boolean;
  plugin?: boolean;
  git?: boolean;
  install?: boolean;
}

const bootstrap = async ({ args, cwd }: Bootstraptype) => {
  const [name] = args._ as [string];
  let npmClient = 'pnpm' as NpmClient;
  let registry = 'https://registry.npmjs.org/';
  let appTemplate = 'app';
  // const { username, email } = await getGitInfo();
  // let author = email && username ? `${username} <${email}>` : '';
  if (!args.default) {
    const response = await prompts(
      [
        {
          type: 'select',
          name: 'appTemplate',
          message: 'Pick Umi App Template',
          choices: [
            { title: 'Simple App', value: 'app' },
            { title: 'Ant Design Pro', value: 'max' },
            { title: 'Vue Simple App', value: 'vue-app' },
          ],
          initial: 0,
        },
        {
          type: 'select',
          name: 'npmClient',
          message: 'Pick Npm Client',
          choices: [
            { title: 'npm', value: 'npm' },
            { title: 'cnpm', value: 'cnpm' },
            { title: 'tnpm', value: 'tnpm' },
            { title: 'yarn', value: 'yarn' },
            { title: 'pnpm', value: 'pnpm' },
          ],
          initial: 4,
        },
        {
          type: 'select',
          name: 'registry',
          message: 'Pick Npm Registry',
          choices: [
            {
              title: 'npm',
              value: 'https://registry.npmjs.org/',
              selected: true,
            },
            { title: 'taobao', value: 'https://registry.npmmirror.com' },
          ],
        },
      ],
      {
        onCancel() {
          process.exit(1);
        },
      }
    );
    npmClient = response.npmClient;
    registry = response.registry;
    appTemplate = response.appTemplate;
  }

  const pluginPrompts = [
    {
      name: 'name',
      type: 'text',
      message: `What's the plugin name?`,
      default: name,
    },
    {
      name: 'description',
      type: 'text',
      message: `What's your plugin used for?`,
    },
    {
      name: 'mail',
      type: 'text',
      message: `What's your email?`,
    },
    {
      name: 'author',
      type: 'text',
      message: `What's your name?`,
    },
    {
      name: 'org',
      type: 'text',
      message: `Which organization is your plugin stored under github?`,
    },
  ] as prompts.PromptObject[];

  const target = name ? join(cwd, name) : cwd;
  const templateName = args.plugin ? 'plugin' : appTemplate;

  const version = require('../package').version;

  const monorepoRoot = await detectMonorepoRoot({ target });
  const inMonorepo = !!monorepoRoot;
  const projectRoot = inMonorepo ? monorepoRoot : target;

  // git
  const shouldInitGit = args.git !== false;
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

  const generator = new BaseGenerator({
    path: join(__dirname, '..', 'templates', templateName),
    target,
    data: {
      version: version.includes('-canary.') ? version : `^${version}`,
      npmClient,
      registry,
      author: '',
      withHusky,
      // suppress pnpm v7 warning
      extraNpmrc: npmClient === 'pnpm' ? `strict-peer-dependencies=false` : '',
    } as any,
    questions: args.default ? [] : args.plugin ? pluginPrompts : [],
  });
  await generator.run();
};

async function detectMonorepoRoot(opts: { target: string }) {
  const { target } = opts;

  const rootPkg = await pkgUp({ cwd: dirname(target) });
  if (!rootPkg) return null;
  const rootDir = dirname(rootPkg);
  if (
    tryPaths([
      join(rootDir, 'lerna.json'),
      join(rootDir, 'pnpm-workspace.yaml'),
    ])
  ) {
    return rootDir;
  }
  return null;
}

export default bootstrap;
