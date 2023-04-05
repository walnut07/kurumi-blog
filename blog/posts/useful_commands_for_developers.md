---
title: 'Terminal Commands that Every Developer Should Know'
metaDesc: 'This article explains some useful commands that every developer should know.'
socialImage: 'images/laptop.png'
date: '2023-3-23'
tags:
  - Unix
lang: 'en'
---

Today, I'm going to introduce some useful commands that every developer should know.
I will update this article as I learn more commands, so please bookmark it and check it back later!

Table of Contents:
1. grep
2. sed
3. awk
4. find
5. rm
6. lsof -i
7. kill
8. ps

## grep
`grep` is a command that **searches for a pattern in a file** and prints the lines that contain that pattern.

```bash
grep "pattern" file
```

### Example
This command searches for the string "walnut07", which is my username, 
in the README.md file under my current directory, and prints the lines that contain the string "walnut07".
```bash
grep "walnut07" ./README.md

> # Kurumi's Blog walnut07.com
```

### Some Points
- **Strongly recommend using `git grep`** instead of `grep` if you are in a git repository. 
  - `git grep` is a command that searches for a pattern in the **git repository** that the current directory is in.
- Use `-i` option to ignore case. E.g.: `git grep -i "pattern"`
- Use `-n` option to print the line number. E.g.: `git grep -n "pattern"`
  ```bash
  git grep -n "walnut07" ./README.md
  > README.md:1:# Kurumi's Blog walnut07.com
  ```
- Use `-v` option to print the lines that do not contain the pattern. `git grep -v "pattern"`
  ```bash
  git grep -v "walnut07" ./README.md
  > README.md:# Kurumi's Blog walnut07.com
  ```

## sed
`sed` is a command that **filters and transforms text**.

```bash
sed "command" file
```

### Example
This command replaces the string "walnut07" with "foobar07" in the README.md file under my current directory, and outputs the result.
```bash
sed "s/walnut07/foobar07/g" ./README.md
> # Kurumi's Blog foobar07.com
```

The `s` command is used to replace the string. The `g` option is used to replace all occurrences of the string.

### Some Points
- Note that `sed` **does not edit the file in place**. 
  - If you want to edit the file in place, use `-i` and `-e` option. E.g.: `sed -i -e "s/walnut07/foobar07/g" ./README.md`
- Use `/number` to specify the Nth occurrence of the string. E.g.: `sed -i -e "s/walnut07/foobar07/2" ./README.md`
  - This command replaces the 2nd occurrence of the string "walnut07" with "foobar07" in the README.md file under my current directory, and edit the file.
- Use `&` to refer to the string that is being replaced. E.g.: `sed -i -e "s/walnut07/&07/g" ./README.md`
  - This command replaces the string "walnut07" with "walnut0707" in the README.md file under my current directory, and edit the file.

## awk
`awk` is a command that **filters and transforms text**.

```bash
awk '{action}' file
```

### Example
This command prints the 2nd column of the README.md file under my current directory.
```bash
awk '{print $2}' ./README.md
```

Result:
```bash
Kurumi's

tech


Built
Next.js
TypeScript
CI/CD
```

### Some Points
- Use `BEGIN` and `END` to specify the action that is executed at the beginning and the end of the file.
  ```bash
  awk 'BEGIN {print "Start"} {print $2} END {print "End"}' ./README.md
  > Start
  > Kurumi's
  > tech
  > Built
  > Next.js
  > TypeScript
  > CI/CD
  > End
  ```

## find
`find` is a command that **finds files in a directory hierarchy**.

```bash
find directory -name "pattern"
```

### Example
This command finds all files that have the string "README.md" in their name under the current directory.
```bash
find . -name "*README.md*"
```
Result:
```bash
./blog/README.md
./README.md
./README.md-e
```

### Some Points
- Use `-type` option to specify the type of the file. E.g.: `find . -type f`
  - `f` is used to specify a regular file.
  - `d` is used to specify a directory.
  - `find . -type f -name "*README.md*"` finds all files that have the string "README.md" in their name under the current directory.
  - `find . -type d -name "*blog*"` finds all directories that have the string "blog" in their name under the current directory.

## rm
`rm` is a command that **removes files**.

```bash
rm file
```

### Example
This command removes the README.md file under the current directory.
```bash
rm ./README.md
```

### Some Points
- Use `-r` option if the file is a directory. E.g.: `rm -r ./blog`

## lsof -i
`lsof -i` is a command that **lists open files**.

```bash
lsof -i
```
Result:
```bash
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    12345 user    3u  IPv4 0x1234567890abcdef      0t0  TCP *:3000 (LISTEN)
loginwindow  123 user   11u  IPv4 0x1234567890abcdef      0t0  TCP *:60000 (LISTEN)
```

### Some Points
- Add a port number to the command to specify the port. E.g.: `lsof -i :3000`
  - This command lists open files that are using port 3000.
    - Result:
      ```bash
      COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
      node    12345 user    3u  IPv4 0x1234567890abcdef      0t0  TCP *:3000 (LISTEN)
      ```
  - Use `-iTCP` or `-iUDP` option to specify the protocol. E.g.: `lsof -iTCP`
  - You can also run `-iTCP:PORT_NUMBER` or `-iUDP:PORT_NUMBER` option to specify the protocol and the port. E.g.: `lsof -iTCP:3000`

## kill
`kill` is a command that **sends a signal to a process**.

```bash
kill -signal PID
```

### Example
This command sends a signal to terminate the process whose process id is 12345.

```bash
kill -9 12345
```

### Some Points
- Use `-9` option to send a signal to the process. E.g.: `kill -9 12345`
  - `-9` is used to send a signal to the process to terminate it.
- Remember that we can get a process id by using `lsof -i` command? Go get a process id and kill it by using `kill -9` command!

## cut
`cut` is a command that **removes sections from each line of files**.

```bash
cut -d "delimiter" -f "field" file
```

### Example
This command prints the 2nd column of the README.md file under my current directory.
```bash
cut -d " " -f 2 ./README.md
```

## ps
`ps` is a command that **reports a snapshot of the current processes**.

```bash
ps
```

### Example

```bash
ps
```

Result:
```bash
  PID TTY           TIME CMD
12345 ttys000    0:00.00 -bash
12346 ttys000    0:00.00 ps
```

### Some Points
- Why is this command useful?
  - This command is useful when you want to know the process id of a process.
  - For example, if you want to kill a process, you can use `kill -9` command with the process id.
  - Also, you can use `lsof -i` command to get the process id of a process that is using a specific port.
  - Then, you can kill the process by using `kill -9` command with the process id.
- Use `-a` option to show processes for all users. E.g.: `ps -a`
- Use `-u` option to show processes for a specific user. E.g.: `ps -u user`

# 