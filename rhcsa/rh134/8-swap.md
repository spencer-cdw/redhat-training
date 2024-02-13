# Swap

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch07s03


| RAM | Swap space | Swap space if allowing for hibernation
| --- | --- | --- |
2 GB or less	| Twice the RAM	| Three times the RAM
Between 2 GB and 8 GB	| Same as RAM| 	Twice the RAM
Between 8 GB and 64 GB	| At least 4 GB	| 1.5 times the RAM
More than 64 GB	| At least 4 GB	| Hibernation is not recommended


`swapon --show`


# Create swap partition

```bash
parted /dev/foo mkpart swap1 linux-swap 1001MB 1257MB
udevadm settle
mkdwap /dev/foo2
free -h 
swapon /dev/foo2
free -h
```

Add to /etc/fstab
```bash
blkid -s UUID -o value /dev/foo2
```

Note that swap doesn't require backup or fsck, so the last two fields are 0 0

```bash
UUID=39e2667a-9458-42fe-9665-c5c854605881   swap   swap   defaults   0 0
```

Remember to run `systemctl daemon-reload` after editing /etc/fstab



## Swap Priority

`swapon --show`

```
UUID=af30cbb0-3866-466a-825a-58889a49ef33   swap   swap   defaults  0 0
UUID=39e2667a-9458-42fe-9665-c5c854605881   swap   swap   pri=4     0 0
UUID=fbd7fa60-b781-44a8-961b-37ac3ef572bf   swap   swap   pri=10    0 0
```

Then enable

```bash
swapon -a
swapon --show
```

Swaps with same priority are used in round robin fashion.

To find information about `pri=42` see `man fstab` and `man swapon`. 

## Notes

You can also do `cat /proc/swaps` to see swap information, however that is deprecated.