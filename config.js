module.exports = {
    globalOptions: [
        {
            option: "--help, -h",
            desc: "Help. global or command specific"
        },
        {
            option: "--show, -s",
            desc: "show git commands to be executed. Doesn't execute them"
        }
    ],
    commandList: [
        {
            "cmd": "branch-copy",
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
            ],
        },

        {
        "cmd": "branch-new",
        "args": "<new_branch> [source]",
        "desc": "Create and switch to a new branch as a copy of current or source branch (if provided)",
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
            "desc": "Changes file to given branch/commit (tree) state. Changes fetched are unstaged.",
            "args": "<path> <tree>",
            "execCommands": [
                {
                "newcmd": "git",
                "args": "checkout {{$tree$}} -- {{$path$}}"
                }
            ]
        },
        {
            "cmd": "blame",
            "desc": "shows last revision details for each line with commit id, author and date of change.",
            "args": "<path>",
            "execCommands": [
                {
                "newcmd": "git",
                "args": "annotate {{$path$}}"
                }
            ]
        },
        {
            "cmd": "re-commit",
            "desc": "add current changes (staged/unstaged) to last commit.",
            "execCommands": [
                {
                "newcmd": "git",
                "args": "commit -a --amend -C HEAD -n"
                }
            ]
        },
        {
            "cmd": "discard-commits",
            "desc": "discard all local commits on this branch, to make the local branch identical to the `upstream` of this branch",
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
            "desc": "Removes the provided commit. WARNING: use only if commit(s) after this are not dependent on this commit",
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
            "execCommands": [
                {
                "newcmd": "git",
                "args": "stash pop stash@{0}"
                }
            ]
        }
          
    ]
}