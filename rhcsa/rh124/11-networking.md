    eno1 = onboard device 1
    ens1 = hotplug device 1
    wlp4s0 = wireless card on PCI 4 in slot 0
    enp0s1f0 = function 0 of ethernet card on bus 0 in slot 1. 


## IPv6

ipv6 is a 128 bit number

```bash
2001:0db8:0000:0010:0000:0000:0000:0001
# is the same as
2001:db8:0:10:0:0:0:1
# Which is the same as 
2001:db8:0:10::1
```

Rules
1. Suppress leading zeros in a group
2. Use a two-colon :: block to shorten the address as much as possible.
3. If an address contains two consecutive groups of zeros, which are equal in length, then shorten the leftmost groups of zeros to :: and the rightmost groups to :0: for each group
4. Although it is allowed, do not use :: to shorten a single group of zeros. Use :0: instead, and save :: for consecutive groups of zeros.
5. Always use lowercase letters for a through f hexadecimal characters.

Always enclose IPv6 addresses in square brackets when used in URLs or other applications that require a port number to follow the address.

```bash
[2001:db8:0:10::1]:80
```

## Common ipv6

| Address | Purpose | Description |
| ------- | ------- | ----------- |
| ::1/128 | Loopback | The loopback address is used by a host to send a message to itself. |
| :: | Unspecified | The unspecified address is used by a host to indicate that it does not have an address. |
| ::/0 | Default route | The default route is used by a host to send a message to any destination. |
| 2000::/3 | Global unicast | Global unicast addresses are used on the Internet.  The addresses include all the networks that range from 2000::/16 through 3fff::/16. |
| fd00::/8 | Unique local | Unique local addresses are used on private networks.  The addresses include all the networks that range from fd00::/8 through fdff::/8. |
| fe80:/10 | Link local | Link local addresses are used on a single link.  The addresses include all the networks that range from fe80::/10 through febf::/10. |
| ff00::/8 | Multicast | The IPv6 equivalent to the 224.0.0.0/4 address. Multicast is used to transmit to multiple hosts at the same time, and is particularly important in IPv6 because it has no broadcast addresses. |

## Ports

Common ports are stored in `/etc/services`

    grep ' 53/udp' /etc/services

## Tools

- tracepath
- traceroute
- ss (socket statistics)

ss replaces netstat

```bash
ss -l # list listening sockets
```

```bash
ss -pl # list processes using sockets
```

```bash
ss -pl -A inet # list processes using sockets, ignore domain sockets. This is the closest to netstat -plnt
```
## Devices

```bash
ip -br addr # show devices

ip -br a # shorthand version of addr

ip link # show mac addresses

ip -s link show en0 # show statistics for en0, such as dropped packets

ip route # show routing table
```