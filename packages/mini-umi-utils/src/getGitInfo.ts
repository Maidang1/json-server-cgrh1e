import { command } from "execa"

export const getGitInfo = async () => {
  try {
    const [{ stdout: username }, { stdout: email }] = await Promise.all([
      command("git config --global user.name"),
      command("git config --global user.email"),
    ])
    return { username, email }
  } catch (e) {
    return {
      username: "",
      email: "",
    }
  }
}
