## How to find inode number
use `ls -i` to show the inode number

## How to create symbolic link
ln -s origional newlink

## View number of files pointed at inode

Here there are 2 pointed at the inode

```
rw-r--r--. 2 student student 11 Mar  3 06:51 files/target.file
-rw-r--r--. 2 student student 11 Mar  3 06:51 links/file.hardlink
```


When you `cd` to a symbolic link, the `pwc` shows the symlink, not the real one. 
Use `cd -P` to show the real path