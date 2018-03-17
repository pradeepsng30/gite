module.exports = {
    commandList: [
        {
            "cmd": "change-last-auth <name> <email>",
            "desc": "Change name and email in last commit",
            "execCommands": [
              {
                "command": "git",
                "arguments": "commit --amend --author \"{{name}} <{{email}}>\""
              }
            ],
          },
          {
            "cmd": "show-commit [n]",
            "desc": "shows last commit",
            "execCommands": [
              {
                "execCommans": "git",
                "arguments": "log -n{{n}} -p"
              }
            ]
          }
    ]
}