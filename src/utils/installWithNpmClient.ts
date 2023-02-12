import { spawnSync } from 'child_process';
export const installWithNpmClient = ({
  npmClient,
  cwd,
}: {
  npmClient: any;
  cwd?: string;
}): void => {
  const npmCli = spawnSync(npmClient, [npmClient === 'yarn' ? '' : 'install'], {
    cwd,
    stdio: 'inherit',
  });
  if (npmCli.error) {
    throw new Error(`${npmClient} init error`);
  }
};
