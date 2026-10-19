# Storage

Ephemeral Storage
Persistent Storage


All pods have ephemeral storage by default
Persistent storage comes from a PV and PVC

### Storage Classes

Static Provisioning
Dynamic Provisioing

### Volume Modes

Filesystem: Gives s directory you can mount

Block: Gives a device like `/dev/xvda` that you then need to format


### Volume Access Modes

ReadWriteOnce (RWO)

ReadWriteOncePod (RWOP)

ReadOnlyMany

ReadWriteMany (RWX)

## Storage Classes

oc get pvc
oc get storageclasses

### Storage Class Annotations

`storageclass.kubernetes.io​/is-default-class=​true`
`storageclass.kubevirt.io​/is-default-virt-class=​true`

`oc describe storageclass nfs-storage | grep is-default-class`

## Persistent Volume Requests

`oc get sotrageprofiles`
`oc get datavolumes -n storage-intro`

### Storage profiles

Storage profiles have 1:1 mapping with storage classes


https://console-openshift-console.apps.ocp4.example.com

## Disk Types

**SATA**
Universal but slow

**Virtio**
Fast but not mountable while powered on
Windows needs drivers

**SCSI**
Supports hotswap

### Deleting data

`oc delete datavolume/mariadb-server-my-disk`


#### Preallocation

Preallocation has faster write speeds.
Openshift writes 0s to the stroage when choosing preallocation

### Resize Disk

If xfs

```bash
lsblk
df -h /dev/sda
sudo xfs_growfs /dev/sda
```