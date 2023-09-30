# BookM
Auto Organize Google exported BookMarks using Node JS  17.8.0
Input is a  Bookmark in html format (used chrome to test) 
The output is an bookmarks in html format which is organized (folders) with the common prefix of the URL of the work
## Example

If the bookmark had the following structure
```
 Bookmarks
   |_ Personal // a personal folder for instance
   |    |_ ABC company // URL https://www.abc.com
   |    |_ my bank // URL https://www.mybank.com
   |_ My Bank // URL https://www.mybank.com/login
   |_ My Bank savings // URL https://www.mybank.com/personal/savings
   |_ Important
   |     |_My Bank // URL https://www.mybank.com
   |     |_My work // URL https://www.my.coolcompany.com
```
The output on console 
```
 Bookmarks
   |_ https://www.mybank.com
   |    |_ my bank // URL https://www.mybank.com/index.hml
   |    |_ My Bank // URL https://www.mybank.com/login
   |    |_ My Bank1 // URL https://www.abc.com
   |    |_ My Bank savings // URL https://www.mybank.com/personal/savings
   |_ https://www.abc.com
   |    |_ ABC company // URL https://www.abc.com
   |_ https://www.my.coolcompany.com
   |     |_ My work // URL https://www.my.coolcompany.com
```
notice the folder names have disappeared . Need to fix this later
________________________
        

## Prerequisite 
1) NodeJS installed ( tested with 17.8.0) and in the execuable PATH
2) Exported chrome bookmark file
## Setps
1) download the project and expand the zip file
2) for simplity put the bookmark in the same directory
3) change directory to where the project files exist
4) open the command line (tested with in Windows 11 (cygwin.exe, command.exe and PowerShell) and apple command lines, given it is a simple node js app)
5) run ```"npm i" ``` -- to download the dependent nodejs packages
6) run ```"node indes.js <filename> ``` "
7) the output actually is just console out , thus the redirect in needed (see run.bat or run.sh )
8) import the output.html to Chrome Bookmark

## History 
I have lot of bookmarks and i cannot find them easily , i have been thinking about this for a while and this is my first pass to solve this the problem.
There are few tweeks i want to do , stand alone version, extension version , etc 
 
