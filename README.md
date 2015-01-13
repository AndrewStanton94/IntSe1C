# IntSe1C

## To set up the repo on your computers:
1. Download and install the github software: http://www.git-scm.com/downloads
2. Create account on github: https://github.com/
3. Navigate to appropriate directory (using cd)
4. Enter `git clone https://github.com'/AndrewStanton94/IntSe.git`


## To upload changes to github:
1. Navigate into the repo.
	!()[https://github.com/AndrewStanton94/IntSe1C/blob/master/gitGuide/cdTo.png "cdTo"]
2. Run `git status` This shows the changes in the repo.
	!()[https://github.com/AndrewStanton94/IntSe1C/blob/master/gitGuide/status.png "status"]
3. Run the `git add` command. _This records the changes made._ You can give:
	* Individual File name from status list (Use tab complete)
	* Wildcard pattern e.g. `*.css` to get all css files
	* The -A flag. This adds all files. _Note: when adding a folder, the content will not be added rerunt this command to add the files._
	__ The add command adds all changes to repo.__ These are: adding new files; modifying existing; and deleting.
	!()[https://github.com/AndrewStanton94/IntSe1C/blob/master/gitGuide/add.png "add"]
4. Run `git commit -m "message"` _Records all changes with a description_ We will need to make these messages as clear as possible.
	__Each commit should cover one change, particularly with bug fixes. 1 commit = 1 bug fix__
	!()[https://github.com/AndrewStanton94/IntSe1C/blob/master/gitGuide/commit.png "commit"]
5. Run `git push` _This copies the changes to the github copy of the repo. Others cannot see it until this happens_
	!()[https://github.com/AndrewStanton94/IntSe1C/blob/master/gitGuide/push.png "push"]
6. All changes copied to the server.
	!()[https://github.com/AndrewStanton94/IntSe1C/blob/master/gitGuide/fin.png "fin"]
