# Selinux


Selinux is a policy (aka boolean) system that manages access to files, ports and other resources.

While `chmod` controlls `who` can access a file, `selinux` controlls `how` and `what` that file can access.

## Setup

Install semanage

```bash
dnf install policycoreutils policycoreutils-python-utils
```

## Commands

```
semanage fcontext
restorecon
setsebool
semanage boolean -l
sealert
```

## States

- Enforcing
- Permissive
- Disabled


RHEL 9 forces `selinux=0` be set in the kernel parameter. 
Previous version could modify `/etc/selinux/config` file to disable selinux.

## Disable selinux

getenforce
setenforce 0
getenforce
cat /etc/selinux/config #might need to change this


## Contexts

`seamanage fcontext --list`

Common context is the 'pirate' `(/.*)?`



stored in `/etc/selinux/targeted/contexts/files`

When moving a file, it will get the new context of the destination unless you use `-p` `--preserve=context` with `cp`

`cp --preserve=context /etc/hosts /tmp/hosts`

mv behaves differently because mv just moves inode filename. 

To change the context with 'mv' use

`mv -Z system_u:object_r:etc_t:s0 /tmp/hosts /etc/hosts`



## Change Context

The recommended method to change the context for a file is to **create a file context policy** by using the *semanage* fcontext command, and then to **apply the specified context in the policy to the file** by using the *restorecon* command. This method ensures that you can relabel the file to its correct context with the restorecon command whenever necessary. The advantage of this method is that you do not need to remember what the context is supposed to be, and you can correct the context on a set of files.

```bash
chcon -t httpd_sys_content_t /var/www/html/index.html
```


## Restore defaults / Apply

```bash
restorecon -Rv /foobar
```


## Policies

To view your modifications to the dfeault policy

```bash
semanage fcontext -l -C
```



# Booleans

booleans let you make your own application specific behavior

`getsbool -a`

`semanage boolean -l | grep http_enable_homedirs`

For example, to enable httpd_enable_homedirs

```bash
getsebool -a | grep home
setsebool -P httpd_enable_homedirs on
```


-P makes the change 'persistent' across reboots (permentant)



# Troubleshooting

- The most common SELinux issue is an incorrect context on new, copied, or moved files.

`dnf install setroubleshoot-server`

Violations are logged to `/var/log/audit/audit.log` and summaries are sent to `/var/log/messages`.

`sealert -l UUID` view specific alert
`sealert -a /var/log/audit/audit.log` view all alerts

or `grep AVC /var/log/audit/audit.log`

Trick is to use `audit2why` and `audit2allow` to generate a policy to allow the action.

`grep AVC /var/log/audit/audit.log | audit2why`

You can also look at the cockpit portal (`dnf install cockpit; systemctl enable --now cockpit`)

[http://localhost:9090](http://localhost:9090)

### Searching for alerts

`ausearch`

```bash
ausearch -m AVC -ts recent
```
