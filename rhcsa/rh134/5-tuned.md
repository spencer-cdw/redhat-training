# tuned

cat /etc/tuned/tuned-main.conf

dnf install tuned
systemctl enable --now tuned
Created symlink /etc/systemd/system/multi-user.target.wants/tuned.service → /usr/lib/systemd/system/tuned.service.



### Get current state

systemctl is-enabled tuned
systemctl is-active tuned

tuned-adm active
tuned-adm profile_info

### Get all profiles

tuned-adm list

### Change profile

tuned-adm profile throughput-performance

### Auto enable

tuned-adm recommend

## Revert

tuned-adm off
tuned-adm active

## Web Console

You can also select the performace profile in the gui

http://localhost:9090

![](https://rol.redhat.com/rol/static/static_file_cache/rh134-9.0/tuning/cockpit-system-main-balanced.png)


## Config files

Confgi files are located in /usr/lib/tuned

cat /usr/lib/tuned/<PROFILE>/tuned.conf

Config files can include other config files

```ini
[main]
summary=Optimize for running inside a virtual guest
include=throughput-performance
```

You can verify individual values with syctl

sysctl vm.dirty_ratio
sysctl vm.swappiness