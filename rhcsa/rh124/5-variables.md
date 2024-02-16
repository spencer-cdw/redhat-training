
## Interactive shells

```bash
/etc/profile
~/.bash_profiles #-< preferred location for only the first login
```
These profiles also import

```bash
/etc/bashrc
~/.bashrc #<- prefered location for all changes as it loads on every shell
```

## Non-interactive shells

    /etc/bashrc
    ~/.bashrc

Non interactive also sources any files in the BASH_ENV variable