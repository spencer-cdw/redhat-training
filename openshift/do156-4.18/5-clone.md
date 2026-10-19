# Cloning VM

Things to avoid cloning

machine security identifier (SID)


Openshift has the concept of `sealing` the vm (e.g. sysprep)

Sealing must have qemu guest agent tools installed. 
You can also do the cleaning in cloud-init

Windows
`sysprep.exe`

Linux
`virt-sysprep`


## clone by command line

`virtctl crate clone --source-name golden-vm --target-name new-vm` 

Alternativly you could look at the spec and make a yaml
```bash
oc api-resources
oc explain virtualmachineclones.spec.source
oc explain virtualmachineclones.spec.target
```

cat ~/DO0024L/solutions/storage-clone/web2-clone.yaml
```yaml
apiVersion: clone.kubevirt.io/v1alpha1
kind: VirtualMachineClone
metadata:
  name: web2-clone
spec:
  source:
    apiGroup: kubevirt.io
    kind: VirtualMachine
    name: golden-rhel
  target:
    apiGroup: kubevirt.io
    kind: VirtualMachine
    name: web2
```

```bash
oc get virtualmachineclone
NAME         PHASE       SOURCEVIRTUALMACHINE   TARGETVIRTUALMACHINE
web2-clone   Succeeded   golden-rhel            web2
```

## Clone by data volume
If CSI drier supports cloneing, openshift uses it. 
If CSI driver doesn't support, clones, openshift revers to temporary snaphosts for cloning.
If backend doesn't support snapshots, openshift starts kbuernets pods to copy the content of the source volume to destination (slowest)

`storageProfile`. defines how it clones

- `csi-clone`
- `snapshot`
- `copy`

### Sysprep

`virtctl guestfs` is the tool to sysprep image

Get the volume name of golden image
`oc get dv | grep -i golden`

Then mount and sysprep the persistent volume claim

`virtctl guestfs golden-rhel-volume`

Once inside search for the sysprep binary, if you don't remember you can search the path
```bash
find / -type f -name *sysprep
/usr/bin/virt-sysprep -a /dev/vda
```

Note that /dev/vda is not intuitive, you would just need to knowt hat you are inisde the a pod with tools and that it mounted the PVC named sda at /dev/vda


---

virtctl guestfs

virt-sysprep / libguestfs-tools


virtctl guestfs -n golden-vms dsk1

virt-sysprep has 40 types of operations to seal a machine

virt-sysprep --list-operations

virt-sysprep -a /dev/vda

virt-sysprep -a /dev/vda --enable ca-certificates,user-account --remove-user-accounts cloud-user