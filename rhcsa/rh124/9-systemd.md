# SystemD

3 Types of systemd units
- service
- socket
- path

```bash
systemctl list-units --type=service
systemctl list-units --type=service --all
systemctl list-unit-files --type=service
```

```bash
systemctl is-active sshd.service
systemctl is-enabled sshd.service
systemctl is-failed sshd.service
systemctl --failed --type=service
```

```bash
systemctl list-unit-files --type=service
```

Attempt to reload config changes if available

```bash
systemctl reload-or-restart sshd.service
```

## Enable

Under the hood, `systemctl enable foobar.service` just creates a symlink
```
Created symlink /etc/systemd/system/multi-user.target.wants/sshd.service → /usr/lib/systemd/system/sshd.service.
````

To enable and start, use the --now flag
```bash
systemctl enable --now sshd.service
Created symlink /etc/systemd/system/multi-user.target.wants/sshd.service → /usr/lib/systemd/system/sshd.service.
```

## Disable

```bash
systemctl disable --now sshd.service
```

Disable a service from being started manually or at boot
```bash
systemctl mask foobar.service
```