# Containers systemD

You can start docker containers using systemD. 
This behaves differently than a normal service because the docker container only starts when you open a session (ssh, gui, ect), it doesn't run as a daemon. 

**You cannot start rootless containers with a system account**

The reason is that `useradd --system` does not reserve a UID for the user. 

## Example (Rootless)

1. Create a dedicated user account to mangage containers

```bash
sudo useradd foobar-adm
sudo passwd foobar-adm
```

**You can't `sudo` or `su` to the user account, you must have a full login session**



```bash
ssh foobar@host
podman run -d --name webserver -p 8080:8080 -v ~/app-artifacts:/var/www/html:Z registry.access.redhat.com/ubi8/httpd-24
```

### SystemD Unit file

The systemD unit file is saved in `~/.config/systemd/user/`

`podman generate systemd --new` (This is the same as `docker run --rm`)
`podman generate systemd` (This does not delete the container on stop)
`podman generate systemd --name webserver1 --new --files` (This will create a new unit file with the name `webserver1` and create a new file for the container)

Copy the service to `~/.config/systemd/user/`

`cp container-webserver1.service ~/.config/systemd/user/`


### Restart Service

Make sure to run systemcl as `--user`

```bash
systemctl --user daemon-reload
systemctl --user start container-webserver1.service
systemctl --user status container-webserver1.service
```

**Its important to not start/stop with podman as it will conflict with systemd**


### Run at Boot

```bash
ssh foobar@server
loginctl show-user foobar | grep Linger
loginctl enable-linger
loginctl show-user foobar | grep Linger
```

## Example (Rootfull)

To run as root: 
1. Do not create a dedicated user
2. Copy the init script to `/etc/systemd/system` instead of `~/.config/systemd/user`
3. Don't use `--user` with `systemctl`
4. Don't use the enable-linger