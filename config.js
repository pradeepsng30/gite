module.exports = {
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
            "cmd": "test",
            "args": "<arg1>",
            "desc": "commit",
            "execCommands": [
              {
                "newcmd": "git",
                "args": "commit -m {{$arg1$}} "
              }
            ]
          }
          
    ]
}