# Container Storage

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch13s05

Use podman unshare to run ac ommand inside the usernamespace

This shows that uid 1 inside podman maps to 1000 outside of podman

```bash
[user@host ~]$ podman unshare cat /proc/self/uid_map
         0       1000          1
         1     100000      65536
[user@host ~]$ podman unshare cat /proc/self/gid_map
         0       1000          1
         1     100000      65536
```


Find the id of user inside container
```bash
[user@host ~]$ podman exec -it db01 grep mysql /etc/passwd
mysql:x:27:27:MySQL Server:/var/lib/mysql:/sbin/nologin
```

Use podman to chown the directory to user 27 on bind mounted host
```bash
[user@host ~]$ podman unshare chown 27:27 /home/user/db_data
```
## SELinux

You must set `container_file_t` SELinux context on the host directory. 

When mounting with SELinux, make sure to use the `Z` option to relabel the bind mount

```bash
podman run -d foobar -v /home/user/db_data:/var/lib/mysql:Z foobar:latest
```

## Ports

to view portmappings use `podman port -a`

Unprivileged users can't bind to ports below 1024

```bash
[user@host ~]$ podman port -a
1c22fd905120	3306/tcp -> 0.0.0.0:13306
[user@host ~]$ podman port db01
3306/tcp -> 0.0.0.0:13306
```

```bash
[root@host ~]# firewall-cmd --add-port=13306/tcp --permanent
[root@host ~]# firewall-cmd --reload
```

## DNS

`podman info --format {{.Host.NetworkBackend}}`

podman 4.0 supports both 

- netavark
- cni

To change between them modify `/usr/share/containers/containers.conf`


Podman doesn't enable dns on the default network. 
To enable

```bash
podman network create --gateway 10.87.0.1 --subnet 10.87.0.0/16 foobar_net
```

`podman network inspect foobar_net`

## Multiple Networks

```bash
podman network create backend
podman network ls
```

```bash
podman network inspect backend
```

```bash
podman network connect backend foo
podman network connect backend bar
```
