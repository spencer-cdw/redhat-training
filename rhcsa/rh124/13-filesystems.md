SATA/SAS/USB-attached storage (SCSI driver)	/dev/sda, /dev/sdb, /dev/sdc, …​
virtio-blk paravirtualized storage (VMs)	/dev/vda, /dev/vdb, /dev/vdc,…​
virtio-scsi paravirtualized storage (VMs)	/dev/sda, /dev/sdb, /dev/sdc, …​
NVMe-attached storage (SSDs)	/dev/nvme0, /dev/nvme1, …​
SD/MMC/eMMC storage (SD cards)	/dev/mmcblk0, /dev/mmcblk1, …​


## Parition naming

/dev/sda1 = partition 1
/dev/vda1 = partition 1
/dev/nvme0n1p1 = device 0, namespace 1, partition 1


# lsblk

lsblk -fp

mount UUID="efd314d0-b56e-45db-bbb3-3f32ae98f652" /mnt/data


# Mounts

When a gui is provided, removable media is mounted to /run/media/<user>/<label>

To view mounts in use

lsof /mnt/data