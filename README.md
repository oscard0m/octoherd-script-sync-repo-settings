# octoherd-script-sync-repo-settings

> This script takes [Repository Options](https://docs.github.com/en/github/administering-a-repository/configuring-pull-request-merges) from a Repository passed as argument and is used as template to apply same Options for other repositories.

[![@latest](https://img.shields.io/npm/v/octoherd-script-sync-repo-settings.svg)](https://www.npmjs.com/package/octoherd-script-sync-repo-settings)
[![Build Status](https://github.com/oscard0m/octoherd-script-sync-repo-settings/workflows/Test/badge.svg)](https://github.com/oscard0m/octoherd-script-sync-repo-settings/actions?query=workflow%3ATest+branch%3Amain)

## Usage

Minimal usage

```js
$ npx octoherd-script-sync-repo-settings \
--template "octoherd/cli"
```

Pass all options as CLI flags to avoid user prompts

```js
npx octoherd-script-sync-repo-settings \
  --template "octoherd/cli" \
  -T ghp_0123456789abcdefghjklmnopqrstuvwxyzA \
  -R "oscard0m/*"
```

## Options

| option                       | type             | description                                                                                                                                                                                                                                 |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--template`     | string           | **Required.** Repository name from where to copy the branch protection settings. Example: `--template "octoherd/cli"`                                                                                                        |
| `--octoherd-token`, `-T`     | string           | A personal access token ([create](https://github.com/settings/tokens/new?scopes=repo)). Script will create one if option is not set                                                                                                         |
| `--octoherd-repos`, `-R`     | array of strings | One or multiple space-separated repositories in the form of `repo-owner/repo-name`. `repo-owner/*` will find all repositories for one owner. `*` will find all repositories the user has access to. Will prompt for repositories if not set |
| `--octoherd-bypass-confirms` | boolean          | Bypass prompts to confirm mutating requests                                                                                                                                                                                                 |

## Inspired by

#### Other Octoherd scripts
* [sync-branch-protection](https://github.com/octoherd/script-sync-branch-protections) by [@gr2m](https://github.com/gr2m)
* [set-pr-merge-config](https://github.com/MunifTanjim/octoherd-script-set-pr-merge-config) by [@MunifTanjim](https://github.com/MunifTanjim)

#### Other GitHub Apps
* [sync-repo-settings](https://github.com/googleapis/repo-automation-bots/tree/master/packages/sync-repo-settings) by [Google](https://github.com/googleapis)
* [Settings GitHub App](https://github.com/probot/settings) by [Probot](https://github.com/probot)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## About Octoherd

[@octoherd](https://github.com/octoherd/) is project to help you keep your GitHub repositories in line.

## License

[ISC](LICENSE.md)
