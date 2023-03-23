---
title: 'What is $PATH and how to use it?'
metaDesc: 'This article explains what "adding a PATH" means and how we should use it.'
socialImage: 'images/shell.jpg'
date: '2023-3-23'
tags:
- Unix
lang: 'en'
---

In this article, we will learn about what PATH is and why we need it. 
We'll cover PATH first, and then dive into .zshrc/bash_profile to deepen our understanding.

## What is PATH?
In short, **PATH is a list of directories that your shell searches for executable files.** 
The variable PATH can look like this: /usr/local/bin:/usr/bin:/bin, which represents a list of directories.
![Terminal/Shell searching commands in PATH](https://drive.google.com/uc?id=1MJIi-OanQPmrZwEVXO0CMGZ4jxCqLs_9)

For example, **if you type `ls` in your shell, your shell will search for the executable file `ls` in the directories listed in PATH.**
In other words, an executable file for the command `ls` is somewhere in the directories listed in PATH. 

I'll guide you through the process of finding the executable file for `ls` in PATH.
First of all, let's use the command `which` to find out where the executable file for `ls` is located.
`which` is a command that prints the location of a file.

```bash
which ls
> /bin/ls
```

(1) Now we know that the executable file for `ls` is located under `/bin`.


Next, let's check if PATH has `/bin` in it. `echo` is a command that prints the value of a variable.

```bash
echo $PATH
> /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```
(2) Now we know that `/bin` is in PATH in the third position.
 *Note that the directories listed in PATH are separated by `:`.*

As you can see, (1) **the command `ls` is implemented by a file located under `/bin`** 
and (2) **`/bin` is in PATH**. Since shell searches for executable files in the directories listed in PATH, it can find the executable file for `ls` in `/bin`.

Now you know about PATH and why we need it. Let's move on to the next topic.

# .zshrc/bash_profile
First things first, **.zshrc and .bash_profile are files that contain commands that will be executed when you open a new shell.**
Let's open up .zshrc or .bash_profile and see what's inside.

```bash
nano ~/.zshrc
# or
nano ~/.bash_profile
```

You will see something like this:

```bash
export PATH=/bin:/usr/bin:/usr/local/bin
```

This means that a variable `PATH`, a string that has the three directories `/bin`, `/usr/bin` and `/usr/local/bin`, is exported when you open up a new shell.
If you have other directories that you already added to PATH, they will be listed as well. In my case, I have `export PATH=$PATH:$HOME/go/bin` underneath.

`export` here is a command that ensures that environment variables to be passed to child processes. 
Therefore, any child process of the shell that you just opened will have the PATH variable set to the value of the PATH variable declared in .zshrc or .bash_profile.

This is why your shell knows what's in the variable PATH whenever you use shell.

### Fun fact
So, .zshrc and .bash_profile are just files that will be executed when you open a new shell.
You can encourage yourself by displaying a message when you open a new shell like this :)

![Terminal displaying "AWESOME PROBLEM SOLVER"](https://drive.google.com/uc?id=1RSKDUu3tShh1SCsKX-fUXWEbhLwT9TB8)

How did I do this? I just used the `echo` that we learned earlier and added it to my .zshrc!

# A little more about PATH
So far, we have learned that PATH is a list of directories that your shell searches for executable files.
But what if there are same executable files in different directories? For example, what if there is a file named `java` in `usr/bin` and `usr/local/bin`? 
Which file will be executed?

The answer is that the file in the directory that comes first in PATH will be executed.
Let's say you have PATH like this

```bash
echo $PATH
> /usr/local/bin:/usr/bin:/bin
```

In this case, the file in `/usr/local/bin` will be executed when you type `java` in your shell.
This can be problematic when you have an older java version in the first file but want to use a newer version which is in the second file.

# Conclusion
In conclusion, we have learned about the importance of the PATH variable and how it is used to search for executable files in directories listed in the PATH.
Additionally, we have discussed that a shell read the first command in PATH when there are multiple executable files with the same name. 
Remember that this can cause problems especially when you want to use an updated version of a command. Overall, understanding the concept of PATH is crucial for anyone working with the command line in a Unix-like environment.
