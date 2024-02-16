# Firewall

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch11

`nftables`is based on `netfiter` framework (opposed to deprecated `iptables` framework)

iptables had multiple tools (`iptables`, `ip6tables`, `ebtables`, `arptables`)

`nft` tool handles everything for `nftables`

Useful tools
- `iptables-translate`
- `ip6tables-translate`


## FirewallD

firewallD uses a concept of `zone`. Packets are assigned a zone based on source ip, interface, and other criteria.

## Predefined Zones

man firewalld.zones(5)

- `trusted`
- `home`
- `internal`
- `work`
- `public`
- `external`
- `dmz`
- `block`
- `drop`


## Services

Predefined services are defined in `/usr/lib/firewalld/services/`

`firewall-cmd --get-services`


- ssh
- dhcpv6-client
- ipp-client
- samaba-client
- mdns
- cockpit

You can also manage services through cockpit

[http://localhost:9090](http://localhost:9090)

## Firewall-cmd

All changes default to `runtime` config, you must use `--permanent` to make changes permanent

    firewall-cmd --list-all
    
    firewall-cmd --get-default-zone
    firewall-cmd --set-default-zone
    firewall-cmd --get-zones
    firewall-cmd --get-active-zones
    
    firewall-cmd --permanent --zone=internal --add-source=192.168.0.0/24
    firewall-cmd --permanent --zone=internal --add-service=mysql
    firewall-cmd --reload
    
    firewall-cmd --permanent --zone=public --add-source=172.25.25.11/32
    firewall-cmd --reload
