# gite: git-easy 
A wrapper for git commands. [![Build Status](https://travis-ci.org/pradeepsng30/gite.svg?branch=master)](https://travis-ci.org/pradeepsng30/gite)

Makes git simpler. 
* Light weight node based CLI (command line interface) app with simple readable commands. 
* Executes git commands at the end to achieve desired result. 
* Exhaustive help menu with sample commands

### Version
`1.1.1`

Check by running `gite --version` or `gite -v`.

### Installation
`npm install -g git-easy`

Prequisites:
* node `v4+`
* npm `v2+`
* git `v2+`

### Run
Run by executing command 
`gite` on console.

##### Options
* `-h`                              Help. Global or command specific.
* `--show, -s `                     Show git commands to be executed. Doesn't execute them.
* `--version, -v `                  Show current gite version.

##### Commands
* `branch-new          `            Create and switch to a new branch as a copy of current or source branch (if provided).
* `branch-keep-copy    `            Create and keep aside (don't switch) a new branch as a copy of current or source branch (if provided).
* `last-change         `            BETA - shows changes from last commit.
* `change-file         `            Changes file to given branch/commit (tree) state. Changes fetched are unstaged.
* `blame               `            shows last revision details for each line with commit id, author and date of change.
* `re-commit           `            add current changes (staged/unstaged) to last commit.
* `discard-commits     `            discard all local commits on this branch, to make the local branch identical to the _upstream_ of this branch.
* `discard-all-changes `            Discard all local changes. Changes are UNRECOVERABLE.
* `discard-file-changes`            Discard all local changes to provided file. Changes are UNRECOVERABLE.
* `remove-commit       `            Removes the provided commit from current tree. WARNING: use only if commit(s) after this are not dependent on this commit.
* `undo                `            shelves all uncommitted changes. Stashes them.
* `redo                `            applies last shelved changes. Removes from shelf.
* `branch-copy         `            Create and switch to a new branch as a copy of current or source branch (if provided).
* `change-msg          `            changes message of last commit
* `rm-file-last-commit `            remove changes of file from last commit
* `rm-branch           `            remove branch from local
* `rm-branch-remote    `            remove branch from provided remote
* `squash              `            squashes (combines) last 'n' commits with self generated squash message
* `squash-all          `            squashes (combines) all unpushed commits with self generated squash message
* `rm-file             `            remove file from git. Doesn't delete it
* `clone-pr            `            checkouts to pull request provided to a new branch.
* `search              `            search commit with message. Shows max 20 results.

........ more to come

run `gite <command> -h` to get more detailed description of that command.
### Contribute
Fork the repo and send PR's. Contributions are welcomed in the form of
* New commands.
* Aliases or better names for commands.
* Better description to commands.
* Test Case.
