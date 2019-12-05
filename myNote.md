### To Delete A File Perm.
sudo rm -r data
# Eslint and Prettier Configurations

## Getting Started

1. Enable the autofix on Save for Eslint (Where it fixes 90% of the normal errors)
# From WebStorm and similar IDEs:
Go to Settings -> Keymap -> type eslint - now double click on Fix ESLint Problems -> Add Keyboard Shortcut -> press CTRL + S
# From VS Code:
Go to Fles -> Preferences -> Settings -> type eslint -> enable Prettier:Eslint Integration and Eslint: AutoFIxOnSave 

2. Enable Format on Save for Prettier (Fixes the auto indentations)

Go to Fles -> Preferences -> Settings ->  type Format on save and enable the Editor:Format On Save




# Testing the Eslint Rules for a Specific Folder/File:

In Terminal type: ./node_modules/.bin/eslint (Name of the file/folder) => Returns the number of errors or warnings occurred.

To Fix errors throug terminal type: ./node_modules/.bin/eslint (Name of the file/folder) --fix

# Knex Config

    killall node
    sudo netstat -tupln
    sudo kill -9 pid

# Vs Code Cheat Sheet
  ctrl + k + 0 to collapse all

# Heroku Deploy specific branch
heroku git:remote -a ezaplus
git add /commit
git push heroku yourbranch:master
