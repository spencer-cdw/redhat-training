# Rsync


--recursive
--links
--perms
--times
--group
--owner
--devices

Specifying a trailing slash is important. Without it, the source directory will be copied into the destination directory. With it, the contents of the source directory will be copied into the destination directory.


Examples
```bash
rsync -av /var/log hosta:/tmp
rsync -av hosta:/var/log /tmp
rsync -av /var/log /tmp
```