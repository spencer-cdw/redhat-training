# LVM

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch08

Physical Volume (PVs)
Volume Group (VGs)
Logical Volume (LVs)


`pvdisplay`
`vgdisplay`
`lvdisplay`


Create parition

```bash
parted /dev/vdb mklabel gpt mkpart primary 1MiB 769MiB
parted /dev/vdb mkpart primary 769MiB 1026MiB
parted /dev/vdb set 1 lvm on
parted /dev/vdb set 2 lvm on
udevadm settle
```

Create PV

`pvcreate /dev/vdb1 /dev/vdb2`

Create Volume Group

`vgcreate vg01 /dev/vdb1 /dev/vdb2`

Create Logical Volume

`lvcreate -n lv01 --size 300M vg01`


Create Filesystem

```bash
mkfs -t xfs /dev/vg01/lv01
mkdir /mnt/data
```


# VDO

VDO stands for Virtual Data Optimizer which does deduplciation, compression and thin provisioning. 

`dnf install kmod-kvdo`

(This isn't required in the exam most likely)

## Extend / Shrink LV

Add new disk to vg
```bash
vgextend vg01 /dev/vdb3
```

Extend Logical Volume

```bash
lvextend -L +100M /dev/vg01/lv01
xfs_growfs /mnt/data
```

Or you can run lvextend and xfs_growfs at the same time with `-r`

```bash
lvextend -L +100M -r /dev/vg01/lv01
```

#### resize2fs

resize2fs can be used instead of xfs_growfs. `resize2fs` supports both online and offline volumes. 

```bash
resize2fs /dev/vg01/lv01
```

### Shrink LV

```bash
vgreduce vg01 /dev/vdb3
```


### Remove LVM

```bash
lvremove /dev/vg01/lv01
vgremove vg01
pvremove /dev/vdb1 /dev/vdb2
```


# Notes

pv doesn't actually map to a phyical volume in the real world. It typically maps to a paritition. You can have multiple pv's on a single disk.
