# Breast Cancer Hub

### Getting Started

#### Installing node
1. Check if you have node and npm install by running ```node -v``` and ```npm -v```. If both are installed, skip this section.
2. Download node from https://nodejs.org/en/download. Follow the steps as shown.
3. Ensure that you have everything downloaded by repeating Step 1

#### Starting with React
1. [Clone the repository](https://github.com/git-guides/git-clone) into a local workspace
2. Open the repo in an IDE of your choice.
3. Open a new terminal for the project
4. Run ```npm install```. You will get many warnings and vulnerabilities. Ignore these. If you get errors, you will have to debug.
5. Run ```npm start```. This will be the command you need to run to start the project most of the time.

#### Updating Dependencies and Running the Project
1. Update dependencies after pulling from the remote repository by running ```npm install```
2. Run ```npm start```


### Branching
All commands must be run inside your project terminal. For all your tasks, you will need to create a branch for your team and submit a pull request once you are done.

#### Creating New Branch

**Option 1: Creating a branch on GitHub**
1. Click the branch button on the github page of our repo. It should be right underneath the repo name and say "stage"
2. Type in the name of the branch you want to create.
3. Click **Create Branch: [branch name]**
4. Open up your project
5. Run ```git pull``` in the terminal to update your branches
6. Run ```git checkout [branch name]``` or ```git switch [branch name]``` to switch to the newly created branch
7. Double check that you are in the correct repository by running ```git branch -a```
8. Make your changes and push as normal while working within your branch
   
**Option 2: Creating a branch locally**
1. ```git branch [name]``` to create a branch with name of [name].
2. ```git checkout [name]``` to switch to branch [name].
3. When you've finished making your changes locally, run ```git push -u origin [name]``` to create the remote branch and push to there.

#### Submit a Pull Request
1. Navigate to the [repository page](https://github.com/cssgunc/catch).
2. Click the **stage** branch button and navigate to the branch you worked on.
3. Click the **Contribute** button
4. Click **Open Pull Request**
5. Click write a description of your changes
6. Click **Create pull request**

#### Utility Functions
In "useSettings.ts," you will find these functions:
1. **getSetting**:
    This function's argument is a string key from "SettingsMap", because of the function's generics TS and any TS powered extensions should infer the returning setting value type, use this function any time you want to request a user setting value.
2. **saveSetting**:
    This function's arguments is are a string key from "SettingsMap" and its corresponding value, because of the function's generics TS and any TS powered extensions should infer the setting value type, use this function any time you want to set a user setting value.
3. **backupSettings**:
    This function is meant to backup the user settings to a database, since this leads to a direct database call it should be called as few times as possible. Its intended use-case is to be called after a batch of saveSetting calls are made (such as  when a user exits a setting menu).
4. **loadBackupSettings**:
    This function is meant to load user settings from a database, this should only be called when a user logs in