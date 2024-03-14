# Time

## timedatectl

timedatectl

timedatectl list-timezones

timedatectl set-timezone America/Denver

## tzselect

tzselect (interactive timezone selecter)

Note that you will still need to run `timedatectl set-timezone foo/bar`. 

# Chronyd


/etc/chrony.conf

chronyc sources -v

  .-- Source mode  '^' = server, '=' = peer, '#' = local clock.
 / .- Source state '*' = current best, '+' = combined, '-' = not combined,
| /             'x' = may be in error, '~' = too variable, '?' = unusable.
||                                                 .- xxxx [ yyyy ] +/- zzzz
||      Reachability register (octal) -.           |  xxxx = adjusted offset,
||      Log2(Polling interval) --.      |          |  yyyy = measured offset,
||                                \     |          |  zzzz = estimated error.
||                                 |    |           \
MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
^* 172.25.254.254                3   6    17    26  +2957ns[+2244ns] +/-   25ms


To modify settings of /etc/crony.conf
iburst is recomended. 

```
server classroom.example.com iburst
```


NTP quality is defined by stratum

```bash
stratum 0 = reference clock
stratum 1 = ntp server directely attached to reference clock
stratum 2 = machine that syncronizes time from NTP server
```