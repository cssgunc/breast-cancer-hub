# Contributing

WORK IN PROGRESS
Ticket board link goes here

### Branching

All commands must be run inside your project terminal. For all your tasks, you will need to create a branch for your team and submit a pull request once you are done.

#### Creating New Branch

Branches should be attached to an issue on GitHub; if an issue does not exist then create it detailing the changes to be made. For example, if you intend to create a branch for a page or component, name the branch after the issue (e.g. `10-settings-page`, `11-notification-component`).

**Option 1: Creating a branch on GitHub**

1. Click the branch button on the github page of our repo. It should be right underneath the repo name and say "stage"
2. Type in the name of the branch you want to create.
3. Click **Create Branch: [branch name]**
4. Open up your project
5. Run `git pull` in the terminal to update your branches
6. Run `git checkout [branch name]` or `git switch [branch name]` to switch to the newly created branch
7. Double check that you are in the correct repository by running `git branch -a`
8. Make your changes and push as normal while working within your branch

**Option 2: Creating a branch locally**

1. `git branch [name]` to create a branch with name of [name].
2. `git checkout [name]` to switch to branch [name].
3. When you've finished making your changes locally, run `git push -u origin [name]` to create the remote branch and push to there.

#### How to Submit a Pull Request

1. Navigate to the [repository page](https://github.com/cssgunc/catch).
2. Click the **stage** branch button and navigate to the branch you worked on.
3. Click the **Contribute** button
4. Click **Open Pull Request**
5. Click write a description of your changes
6. Click **Create pull request**
