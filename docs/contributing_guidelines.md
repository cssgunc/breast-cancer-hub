# Contributing

## Assigning Tickets
All issues can be found on the Issues tab of this repository. You can also view them in the Projects bar for better organization.

We are using GitHub issues to represent tickets and their acceptance criteria (things that must be done for the ticket to be closed). Click on them to open more info about them.

Sometimes you may notice work to be done that does not have an issue on GitHub. If an issue does not exist for the thing you want to change, then create one detailing the changes to be made.

When you are ready to take on a ticket, open the issue and go to "Assignees" and assign yourself to the ticket. 1 person per ticket only.

## Branching - please read the entire section carefully

Each ticket needs to be associated with a development branch.\
There are three parts to this:
1. Naming the branch
2. Creating the branch
3. Attaching the branch to the GitHub issue via the GitHub web interface

### Naming Conventions
Once you have chosen your ticket, come up with the name of your branch. This must be of the format `issuenumber-short-descriptive-name`. Base the name off the name of the GitHub issue. For example, if you intend to create a branch for a page or component, name the branch after the issue (e.g. `10-settings-page`, `11-notification-component`).

### Creating New Branch
Next, you need to create the actual branch.
All commands must be run inside your project terminal. For all your tasks, you will need to create a branch for your team and submit a pull request once you are done.

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

## Developing in your branch
All of the code related to your issue should be contained to your branch only. Do not make changes to other people's branches.

A single branch should not last longer than 2 weeks and should have very self-contained, easy to identify changes.

### Making proper commits
A proper commit should focus on one small piece of functionality and describe what has changed.\
Only commit code that is working. Do not commit broken code.\
Commits should start with an imperative verb and describe the overall change.\
Example: "Fix calendar component not appearing on mobile"\
For a resource on good commit messages, see here: https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60

### Keeping your branch up to date
Occasionally, you may want to merge the contents of `stage` into your branch to keep it up to date. Follow these steps while remaining on your branch:
1. `git fetch origin` to fetch the latest remote changes from origin for all branches
2. `git merge origin/stage` to merge the remote stage branch into your own local branch

## Submitting Pull Requests
Pull requests (PRs) represent a set of commits on a specific branch that are proposed to be merged into the `stage` branch.

PRs have the following lifecycle:
1. The PR is opened by the developer, who wants to merge their work from their branch into `stage`. The developer should request a review or let one of the project leads know.
3. The PR gets reviewed by a code reviewer such as a Tech Lead.
4. If changes need to be made, the developer continues to work on that branch and re-requests another review when they are ready.
5. If the changes are accepted, the branch commits will be merged into stage and the branch is now inactive.

Developers are expected to have successful PRs every 2 weeks - this means you should submit your PR in advance, some time after one week, so you have time for fixing any issues.

### Making a Pull Request
1. Navigate to the [repository page](https://github.com/cssgunc/breast-cancer-hub).
2. Click the **stage** branch button and navigate to the branch you worked on.
3. Click the **Contribute** button
4. Click **Open Pull Request**
5. Write a short description of your changes
6. Click **Create pull request**

Next: Read about the preexisitng components, functions and other things we have already implemented [here](using_components.md).
