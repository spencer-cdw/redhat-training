# Virsh

![](https://static.ole.redhat.com/rhls/courses/do156-4.18/images/accessing/resources/assets/architectural-overview.svg)

virt-handler runs as a deamonset on every node. It talks to virt-launcher which is the pod that calls the libvritd command to start/manage a vm


virsh is considered low level. Usually better to run `oc` or `virtctl`. 
Bypasses kubernetes

```bash
virsh list
virsh start
virsh shutdown
virsh reset
virsh restore
```

### Virtctl

vm specific tasks, communicates though kubernetes api

```bash
virtctl stop foobar
virtctl create vm --name foobar
```

## OC

```bash
oc get vm        # shows all vms
oc get vmis -A   # shows more details showing state of vm
```

