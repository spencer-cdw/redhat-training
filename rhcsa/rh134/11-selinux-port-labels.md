# SELinux Port Labels

sudo cat /etc/services

sudo semanage port --list

### Create new port

```bash
semanage port -a -t foobar_t -p tcp 1234
semanage port -a -t foobar_t -p udp 1234
```

View customizations

`semanage port --list -C`


dnf install selinux-policy-doc
mak -k _selinux

