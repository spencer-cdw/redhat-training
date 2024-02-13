Get info of current user

```bash
id
```

Get info of another user

```bash
id <username>
```


```bash
cat /etc/passwd
...output omitted...
user01:x:1000:1000:User One:/home/user01:/bin/bash
```
- user01 : The username for this user.
- x : The user's encrypted password was historically stored here; it is now a placeholder.
- 1000 : The UID number for this user account.
- 1000 : The GID number for this user account's primary group. Groups are discussed later in this section.
- User One : A brief comment, description, or the real name for this user.
- /home/user01 : The user's home directory, and the initial working directory when the login shell starts.
- /bin/bash : The default shell program for this user that runs at login. Some accounts use the /﻿sbin/nologin shell to disallow interactive logins with that account.
- 
```bash
cat /etc/group
...output omitted...
group01:x:10000:user01,user02,user03
```

- group01 : Name for this group.
- x : Obsolete group password field; it is now a placeholder.
- 10000 : The GID number for this group (10000).
- user01,user02,user03 : A list of users that are members of this group as a supplementary group.


# Lock user accounts

`usermod -L bob`

Lock user account in the future

`usermod -L -e 2022-08-14 bob`

Change user duration permenantly

`/etc/login.defs`

change user password duration temporarially

Unlock account

`usermod -U bob`

chage -m 0 -M 90 -W 7 -I 14 sysadmin05

-m = min days (time until they can change password again, usually 0)
-M = max days (time until password needs a reset)
-W = warn days (when to warn usres)
-I = inactive days 
