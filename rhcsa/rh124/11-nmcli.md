nmcli = network manager cli

ifcfg is deprecated
/etc/sysconfig/network-scripts is deprecated


For the test, use `nmtui` since it is faster and easier than `nmcli`. 
`dnf install NetworkManager-tui`
`nmtui`

## Config files
/etc/NetworkManager/system-connections


## nmcli

nmcli --complete-args #enable bash shell completion


Add network device

```bash
nmcli con add \
    con-name eno2 \
    type ethernet \
    ifname eno2

nmcli con add \
    con-name eno3 \
    type ethernet \
    ifname eno3 \
    ipv4.method manual \
    ipv4.addresses 192.168.0.5/24 \
    ipv4.gateway 192.168.0.254

nmcli con add \
    con-name eno4 \
    type ethernet \
    ifname eno4 \
    ipv6.addresses 2001:db8:0:1::c000:207/64 \
    ipv6.gateway 2001:db8:0:1::1 \
    ipv6.method manual \
    ipv4.addresses 192.0.2.7/24 \
    ipv4.gateway 192.0.2.1 \
    ipv4.method manual
```

nmcli con show static-ens3
nmcli connection modify
nmcli con reload
nmcli con up <name>


# Disconnect


`nmcli dev disconnect ens3`

Note `nmcli connection down` is ineffective since most interfaces have autoconnect enabled


# Files

Persistent connections
/etc/NetworkManager/system-connections/

Temporary connections (removed at reboot)
/run/NetworkManager/system-connections/

PreDeployed immutable profiles
/usr/lib/NetworkManager/system-connections/

# Modify

To add a second value use `+`

nmcli con mod ID +ipv4.dns IP 1.1.1.1