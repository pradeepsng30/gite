module.exports = {
    globalOptions: [
        {
            'option': '-h',
            'desc': 'Help. global or command specific',
        },
        {
            'option': '--show, -s',
            'desc': 'Show git commands to be executed. Doesn\'t execute them',
        },
        {
            'option': '--version, -v',
            'desc': 'Show current gite version',
        },
    ],
    commandList: [
        {
            'cmd': 'branch-copy',
            'args': '<new_branch> [source]',
            'desc': 'Create and switch to a new branch as a copy of current or source branch (if provided)',
            'longDesc' : {
                'required': [
                    '<new_branch>:\t desired name of the new (copy) branch',
                ],
                'optional': [
                    '[source]:\t source branch name. May refer to other repo branch using remote/branch_name.',
                ],
                'samples': [
                    'master2 upstream/master',
                    'test_branch',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'checkout -b {{$new_branch$}} {{$source$}}',
                },
            ],
        },

        {
            'cmd': 'branch-new',
            'args': '<new_branch> [source]',
            'desc': 'Create and switch to a new branch as a copy of current or source branch (if provided)',
            'longDesc' : {
                'required': [
                    '<new_branch>:\t desired name of the new branch',
                ],
                'optional': [
                    '[source]:\t source branch name. May refer to other repo branch using remote/branch_name.',
                ],
                'samples': [
                    'master2 upstream/master',
                    'test_branch',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'checkout -b {{$new_branch$}} {{$source$}}',
                },
            ],
        },
        {
            'cmd': 'backup',
            'args': '<new_branch> [source]',
            'desc': 'Create and keep aside (don\'t switch) a new branch as a copy of current or source branch (if provided)',
            'longDesc' : {
                'required': [
                    '<new_branch>:\t desired name of the new branch',
                ],
                'optional': [
                    '[source]:\t source branch name. May refer to other repo branch using remote/branch_name.',
                ],
                'samples': [
                    'master2 upstream/master',
                    'test_branch',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'checkout -b {{$new_branch$}} {{$source$}}',
                },
                {
                    'newcmd': 'git',
                    'args': 'checkout -',
                },
            ],
        },
        {
            'cmd': 'last-change',
            'desc': 'BETA- shows changes from last commit',
            
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'log -p',
                },
            ],
        },
        {
            'cmd': 'change-file',
            'args': '<path> <tree>',            
            'desc': 'Changes file to given branch/commit (tree) state. Changes fetched are unstaged.',
            'longDesc' : {
                'required': [
                    '<path>:\t path to file',
                    '<tree>:\t branch or commit id. From which file state is desired.', 
                ],
                'samples': [
                    './text.txt upstream/master',
                    './text.txt develop',
                    'index.js 5ac1d4',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'checkout {{$tree$}} -- {{$path$}}',
                },
            ],
        },
        {
            'cmd': 'blame',
            'args': '<path>',            
            'desc': 'Shows last revision details for each line with commit id, author and date of change.',
            'longDesc' : {
                'required': [
                    '<path>:\t path to file',
                ],
                'samples': [
                    'index.js',
                    'src/main.py',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'annotate {{$path$}}',
                },
            ],
        },
        {
            'cmd': 're-commit',
            'desc': 'Add current changes (staged/unstaged) to last commit.',
            'longDesc' : {
                'samples': [
                    ' ',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'commit -a --amend -C HEAD -n',
                },
            ],
        },
        {
            'cmd': 'discard-commits',
            'desc': 'Discard all local commits on this branch, to make the local branch identical to the `upstream` of this branch',
            'longDesc' : {
                'samples': [
                    ' ',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'reset --hard @{u}',
                },
            ],
        },
        {
            'cmd': 'discard-all-changes',
            'desc': 'Discard all local changes. Changes are UNRECOVERABLE',
            'longDesc' : {
                'samples': [
                    ' ',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'reset --hard',
                },
            ],
        },
        {
            'cmd': 'discard-file-changes',
            'args': '<path>',                        
            'desc': 'Discard all local changes to provided file. Changes are UNRECOVERABLE',
            'longDesc' : {
                'required': [
                    '<path>:\t path to file',
                ],
                'samples': [
                    './text.js',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'checkout HEAD -- {{$path$}}',
                },
            ],
        },
        {
            'cmd': 'rm-commit',
            'args': '<comm_id>',                        
            'desc': 'Removes the provided commit from current tree. WARNING: use only if commit(s) after this are not dependent on this commit',
            'longDesc' : {
                'required': [
                    '<comm_id>:\t sha1 commit id.',
                ],
                'samples': [
                    '3ar454',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'rebase -p --onto {{$comm_id$}}^ {{$comm_id$}}',
                },
            ],
        },
        {
            'cmd': 'undo',
            'desc': 'shelves all uncommited changes. stashes them.',
            'longDesc' : {
                'samples': [
                    ' ',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'stash',
                },
            ],
        },
        {
            'cmd': 'redo',
            'desc': 'applies last shelved changes. Removes from shelf',
            'longDesc' : {
                'samples': [
                    ' ',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'stash pop stash@{0}',
                },
            ],
        },
        {
            'cmd': 'change-msg',
            'args': '<msg>',                        
            'desc': 'changes message of last commit',
            'longDesc' : {
                'required': [
                    '<msg>:\t new message',
                ],
                'samples': [
                    '\'new commit message\'',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'commit --amend -m {{$msg$}} -n',
                },
            ],
        },
        {
            'cmd': 'rm-file-last-commit',
            'args': '<path>',                        
            'desc': 'remove changes of file from last commit',
            'longDesc' : {
                'required': [
                    '<path>:\t path to file',
                ],
                'samples': [
                    './text.txt',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'checkout HEAD^ {{$path$}}',
                },
                {
                    'newcmd': 'git',
                    'args': 'add {{$path$}}',
                },
                {
                    'newcmd': 'git',
                    'args': 'commit --amend --no-edit -n',
                },
            ],
        },
        {
            'cmd': 'rm-branch',
            'args': '<branch>',                        
            'desc': 'remove branch from local',
            'longDesc' : {
                'required': [
                    '<branch>:\t branch',
                ],
                'samples': [
                    'test',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'branch -D {{$branch$}}',
                },
            ],
        },
        {
            'cmd': 'rm-branch-remote',
            'args': '<remote> <branch>',                        
            'desc': 'remove branch from provided remote',
            'longDesc' : {
                'required': [
                    '<remote>:\t remote',
                    '<branch>:\t branch name',
                ],
                'samples': [
                    'origin test',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'push {{$remote$}} --delete {{$branch$}}',
                },
            ],
        },
        {
            'cmd': 'squash',
            'args': '<n>',                        
            'desc': 'squashes (combines) last \'n\' commits with self generated squash message',
            'longDesc' : {
                'required': [
                    '<n>:\t last n commits to be combined',
                ],
                'samples': [
                    '3',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'reset --hard HEAD~{{$n$}}',
                },
                {
                    'newcmd': 'git',
                    'args': 'merge --squash HEAD@{1}',
                },
                {
                    'newcmd': 'git',
                    'args': 'commit -n --no-edit',
                },
            ],
        },
        {
            'cmd': 'squash-all',
            'desc': 'squashes (combines) all unpushed commits with self generated squash message',
            'longDesc' : {
                'samples': [
                    ' ',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'reset --hard @{u}',
                },
                {
                    'newcmd': 'git',
                    'args': 'merge --squash HEAD@{1}',
                },
                {
                    'newcmd': 'git',
                    'args': 'commit --no-edit -n',
                },
            ],
        },
        {
            'cmd': 'rm-file',
            'args': '<path>',                        
            'desc': 'remove file from git. Doesn\'t delete it',
            'longDesc' : {
                'required': [
                    '<path>:\t path to file',
                ],
                'samples': [
                    './text.txt',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'rm --cached {{$path$}}',
                },
            ],
        },
        {
            'cmd': 'clone-pr',
            'args': '<remote> <pr_no> <branch>',                        
            'desc': 'checkouts to pull request provided to a new branch.',
            'longDesc' : {
                'required': [
                    '<remote>:\t fork to which PR is raised.',
                    '<pr_no>:\t PR number',
                    '<branch>:\t new branch name.',
                ],
                'samples': [
                    'upstream 2134 pr_branch',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'fetch {{$remote$}} pull/{{$pr_no$}}/head:{{$branch$}}',
                },
                {
                    'newcmd': 'git',
                    'args': 'checkout {{$branch$}}',
                },
            ],
        },
        {
            'cmd': 'search',
            'args': '<text>',                        
            'desc': 'search commit with message. shows max 20 results',
            'longDesc' : {
                'required': [
                    '<text>:\t text to search for in commit message',
                ],
                'samples': [
                    '\'fixes\'',
                ],
            },
            'execCommands': [
                {
                    'newcmd': 'git',
                    'args': 'log --max-count=20 --abbrev-commit  --grep={{$text$}}',
                },
            ],
        },
    ],
};
