# NFS

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch09


`dnf install nfs-utils`


Use RPC to view NFSv3 server (doesn't work for v4)
`showmount --exports server`


## Example

```bash
serverb.lab.example.com:/shares/public  /public  nfs  rw,sync  0 0
```

# autofs

autofs solves the problem of unprivileged users being unable to mount NFS shares. 
It also reduces likelyhood of corruption by only mounting on demand. 
It can even select the fastest route when load balancing. 

`sudo dnf install autofs nfs-utils`


### Master Map
Filename is arbitrary but must end in .autofs

`/etc/auto.master.d/demo.autofs`

### Indirect Map


`/etc/auto.demo`

Example contents

`work  -rw,sync  serverb:/shares/work`



### Direct Map

Direct maps always start with `/-` 

`/- /etc/auto.direct`

The contents of /etc/auto.direct would look like

`/mnt/docs -rw,sync serverb:/shares/docs`



### Service

`sudo systemctl enable --now autofs`

### Systemd 

Alternativly you can use systemd.automount which automatically creates unit files for entries in /etc/fstab (if they include x-systemd.automount option)

e.g. `/remote/finance` creates `remote-finance.automount` and automatically mounts it when `/remote/finance` is accessed.

`systemd.automount` is easier than autofs however it only supports absolute path mounts (like direct mounts)



## Examples


/etc/auto.master.d/indirect.autofs
```bash
/internal	/etc/auto.indirect
```

/etc/auto.indirect
```bash
*	-rw,sync,fstype=nfs4	serverb.lab.example.com:/shares/indirect/&
```

This ^ is functionally the same as listing out every directory 

```bash
foo	-rw,sync,fstype=nfs4	serverb.lab.example.com:/shares/indirect/foo
bar	-rw,sync,fstype=nfs4	serverb.lab.example.com:/shares/indirect/bar
```

When I cd to /internal/ it shows nothing (expected)
When I cd to /internal/foo it mounts serverb:/shares/indirect/foo
When I cd to /internal/bar it mounts serverb:/shares/indirect/bar

