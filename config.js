module.exports = {
    commandList: [
        {
            "cmd": "change-last-auth",
            "args": "<name> <email>",
            "desc": "Change name and email in last commit",
            "execCommands": [
              {
                "newcmd": "git",
                "args": "commit --amend --author \"{{$name$}} <{{$email$}}>\""
              }
            ],
          },
          {
            "cmd": "show-commit",
            "args": "[n]",
            "desc": "shows last commit",
            "execCommands": [
              {
                "newcmd": "git",
                "args": "log {{-n$n$}} -p"
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