module.exports = {
    globalOptions: [
        {
           "option": "-h",
            "desc": "Help. global or command specific"
        },
        {
            "option": "--show, -s",
            "desc": "Show git commands to be executed. Doesn't execute them"
        },
        {
            "option": "--version, -v",
            "desc": "Show current gite version"
        }
    ],
    commandList: [
        {
            "cmd": "branch-copy",
            "args": "<new_branch> [source]",
            "desc": "Create and switch to a new branch as a copy of current or source branch (if provided)",
            "longDesc" : {
                "required": [
                    '<new_branch>:\t desired name of the new (copy) branch'
                ],
                "optional": [
                    '[source]:\t source branch name. May refer to other repo branch using remote/branch_name.'
                ],
                "samples": [
                    'master2 upstream/master',
                     'test_branch'
                    ]
            },
            "execCommands": [
              {
                "newcmd": "git",
                "args": "checkout -b {{$new_branch$}} {{$source$}}"
              }
            ],
        },

        {
        "cmd": "branch-new",
        "args": "<new_branch> [source]",
        "desc": "Create and switch to a new branch as a copy of current or source branch (if provided)",
        "longDesc" : {
            "required": [
                '<new_branch>:\t desired name of the new branch'
            ],
            "optional": [
                '[source]:\t source branch name. May refer to other repo branch using remote/branch_name.'
            ],
            "samples": [
                'master2 upstream/master',
                 'test_branch'
                ]
        },
        "execCommands": [
            {
            "newcmd": "git",
            "args": "checkout -b {{$new_branch$}} {{$source$}}"
            }
        ]
        },
        {
        "cmd": "branch-keep-copy",
        "args": "<new_branch> [source]",
        "desc": "Create and keep aside (don't switch) a new branch as a copy of current or source branch (if provided)",
        "longDesc" : {
            "required": [
                '<new_branch>:\t desired name of the new branch'
            ],
            "optional": [
                '[source]:\t source branch name. May refer to other repo branch using remote/branch_name.'
            ],
            "samples": [
                'master2 upstream/master',
                 'test_branch'
                ]
        },
        "execCommands": [
            {
                "newcmd": "git",
                "args": "checkout -b {{$new_branch$}} {{$source$}}"
            },
            {
                "newcmd": "git",
                "args": "checkout -"
            }
        ]
        },
        {
            "cmd": "last-change",
            "desc": "BETA- shows changes from last commit",
            
            "execCommands": [
                {
                "newcmd": "git",
                "args": "log -p"
                }
            ]
            },
        {
            "cmd": "change-file",
            "args": "<path> <tree>",            
            "desc": "Changes file to given branch/commit (tree) state. Changes fetched are unstaged.",
            "longDesc" : {
                "required": [
                    '<path>:\t path to file',
                    '<tree>:\t branch or commit id. From which file state is desired.' 
                ],
                "samples": [
                    './text.txt upstream/master',
                    './text.txt develop',
                    'index.js 5ac1d4'
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "checkout {{$tree$}} -- {{$path$}}"
                }
            ]
        },
        {
            "cmd": "blame",
            "args": "<path>",            
            "desc": "Shows last revision details for each line with commit id, author and date of change.",
            "longDesc" : {
                "required": [
                    '<path>:\t path to file',
                ],
                "samples": [
                    'index.js',
                     'src/main.py'
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "annotate {{$path$}}"
                }
            ]
        },
        {
            "cmd": "re-commit",
            "desc": "Add current changes (staged/unstaged) to last commit.",
            "longDesc" : {
                "samples": [
                    ' ',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "commit -a --amend -C HEAD -n"
                }
            ]
        },
        {
            "cmd": "discard-commits",
            "desc": "Discard all local commits on this branch, to make the local branch identical to the `upstream` of this branch",
            "longDesc" : {
                "samples": [
                    ' ',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "reset --hard @{u}"
                }
            ]
        },
        {
            "cmd": "discard-all-changes",
            "desc": "Discard all local changes. Changes are UNRECOVERABLE",
            "longDesc" : {
                "samples": [
                    ' ',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "reset --hard"
                }
            ]
        },
        {
            "cmd": "discard-file-changes",
            "args": "<path>",                        
            "desc": "Discard all local changes to provided file. Changes are UNRECOVERABLE",
            "longDesc" : {
                "required": [
                    '<path>:\t path to file',
                ],
                "samples": [
                    './text.js',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "checkout HEAD -- {{$path$}}"
                }
            ]
        },
        {
            "cmd": "remove-commit",
            "args": "<comm_id>",                        
            "desc": "Removes the provided commit from current tree. WARNING: use only if commit(s) after this are not dependent on this commit",
            "longDesc" : {
                "required": [
                    '<comm_id>:\t sha1 commit id.',
                ],
                "samples": [
                    '3ar454',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "rebase -p --onto {{$comm_id$}}^ {{$comm_id$}}"
                }
            ]
        },
        {
            "cmd": "undo",
            "desc": "shelves all uncommited changes. stashes them.",
            "longDesc" : {
                "samples": [
                    ' ',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "stash"
                }
            ]
        },
        {
            "cmd": "redo",
            "desc": "applies last shelved changes. Removes from shelf",
            "longDesc" : {
                "samples": [
                    ' ',
                    ]
            },
            "execCommands": [
                {
                "newcmd": "git",
                "args": "stash pop stash@{0}"
                }
            ]
        }
          
    ]
}