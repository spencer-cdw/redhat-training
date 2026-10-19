# Storage import

# Importing VM

Note you must pre-create the namespace on the new cluster

`oc apply -f fedora-vm.yml`


You can also import from openstack,kvm as ISO,raw or qcow2
```bash
virtctl image-upload dv fedora-rootdisk --side 30Gi --image-path fedora-vm-disk.img.gz --storage-class ocs-external-storagecluster-ceph-rbd-virtualization
virtctl create vm --name fedora-import --volume-pvc src:fedora-rootdisk | oc apply -f -
```


In the labs they dont tell you the storage class to import into, so you need to figure that out. 

oc get pvc
oc describe pvc foobar | grep storageClassName




---

virtctl image-upload dv httpd-server --size=10Gi \
  --storage-class ocs-external-storagecluster-ceph-rbd-virtualization \
  --image-path=httpd-server-pvc.img.gz


The create vm gives you yaml that you then import with `oc apply -f -`

virtctl create vm --name=httpd-server-backup \
  --volume-pvc=src:httpd-server 

virtctl create vm --name=httpd-server-backup \
  --volume-pvc=src:httpd-server | oc apply -f -