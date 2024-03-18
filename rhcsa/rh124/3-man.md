## General

man pages are stored in `/usr/share/man`


Search for man pages that mention passwd
```
man -k passwd
apropos mkdir #same thing as man -k mkdir
```

Search open man pages that mention passwd
(press q to exit each page, or man to view the next)

    man -K passwd


## Reindex

If man pages aren't returning anything

```bash
man -k vim
vim: nothing appropriate
```

Most likely you need to either install man pages, or reindex

```bash
dnf install man-pages
```

Or reindex

```bash
mandb
``` 

## Shortcuts

    f (space) - forward one window
    b - backward one window
    d - down half window
    u - up half window
    
    g - go to top of page
    G - go to bottom of page

    h - help
    / - search forward

### Searching

    man mkdir | grep -- '-m'
    man mkdir | grep -e '-m' #same thing as above


# man -k / man -K

`man -k` searches just headings
`man -K` searches all text (takes longer)