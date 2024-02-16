# Storage

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch07



## MBR

- Supports 4 primary partitions
- Supports 15 partitions total (on linux)
- Supports 2TB drives

## GPT

- Supports 128 partitions
- Supports 8ZiB drives


## Partitioning

`parted /dev/vda print`

### MBR

`parted /dev/vdb mkpart primary xfs 2048s 1000MB`
`udevadm settle` # man pages say not to use it, but redhat training says you should. 

### GPT

GPT parititons don't need the 'primary' 'extended' flag defined
`parted /dev/vdb mkpart foobar xfs 2048s 1000MB`
`udevadm settle`


## FileSystems

mkfs.xfs /dev/vdb1

mkfs.ext4 /dev/vdb1


## Mounting

`mount /dev/vdb1 /mnt/foobar`

## UUID

`lsblk --fs`


## Fstab

| Device | Mount Point | File System | Options | Dump | Pass |

Device = UUID or /dev/vdb1
Mount Point = /mnt/foobar
File System = xfs
Options = comma separated options
Dump = 0 or 1, weather to back up the device (not really used)
Pass = 0 or 1, weather to check the device at boot with fsck (not used on XFS) (ext4 should be 1 for root, and 2 for others)

`UUID=a8063676-44dd-409a-b584-68be2c9f5570   /        xfs   defaults   0 0`

### fstab verify

`findmnt --verify`

or

`mount /foobar`

Be sure to use `systemctl daemon-reload` after modifying `/etc/fstab`


---

```bash
parted /dev/vdb print
parted /dev/vdb mklabel gpt
parted /dev/vdb mkpart backup xfs 2048s 2GB
parted /dev/vdb print
udevadm settle
```