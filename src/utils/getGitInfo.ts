import { execaCommand } from 'execa';

export const getGitInfo = async () => {
  try {
    const [{ stdout: username }, { stdout: email }] = await Promise.all([
      execaCommand('git config --global user.name'),
      execaCommand('git config --global user.email'),
    ]);
    return { username, email };
  } catch (e) {
    return {
      username: '',
      email: '',
    };
  }
};
