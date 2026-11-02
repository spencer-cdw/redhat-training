# Snapshots

2 Types of snapshots
- Volume
- Machine


Machine Snapshot: 
- `oc get virtualmachinesnapshot`
Volume Snapshot:
- `oc get volumesnapshots`

If you atteact a PVC to a running machine, it uses the `scsi` driver, if stopped it uses the `virtio` driver

On QEMU you must have guest agent running to safely take a snapshot of the vm. It tells the os to quiesce the file system and flush all caches to disk. 


**Note:** Snapshots also include CPU/Memory, so restoring snapshot will revert any hardware changes. 

