# virtcl

virctl is the kubevirt command line interface. 


Get vm instances with oc command
```bash
oc project virtualization-deploy
oc get vm
NAME         AGE     STATUS    READY
rhel9-test   8m10s   Running   True
```

Openshift makes a (virt-launcher) pod for every vm
```bash
oc get pod
NAME                             READY   STATUS    RESTARTS   AGE
virt-launcher-rhel9-test-4x8fl   1/1     Running   0          8m31s
```


## Stop VM

virtctl stop rhel9-test



# Topics
| Component | Purpose |
| --- | --- | 
| KVM | Technology for the hypervisor in openshift | 
| Red Hat Marketplace | Catalog of cerified enterprise operators | 
| HCO | HyperConverted clutster operator
| virt-handler | host-level daemonset that monitors changes to a VM object | 
| virt-launcher | pod that sets up cgroups and runs libvirtd, monitors vm until termination
| virt-controller | handles cluster wide virtulization. Part of operator
| pod eviction and descheduler | 
| OLM | Operator Lifecycle Manager, deploys pods for each component| 

## Operators

CDI | Containerized Data importer, manages authorization to upload vm disk sto PVC
HPP | Hostpath provisioner | manages PV and PVC by creating directories
SSP | Scheduling, Scale, and Performance deployes common templates related to boot sources
cdi-operator | storage
cluster-network-addons-operator | network
ssp-operator | scaling
tekton-tasks-operator | templating



![](image-3.png)

![virt-operator](image-5.png)



## Commands

Console access

```bash
virtctl console foobar
```

VNC access

```bash
virtctl vnc foobar
```
Use remote-viewer, virt-viewer, tigerVNC, TightVNC


SSH Access

```bash
virtctl ssh -i .ssh/foobar --username foo foobar
```

Port Forward

```bash
virtctl port-forward vm/foobar 22080:80
```
or with oc by connecting to the virt-launcher pod
```
oc port-forward pod/virt-launcer-postgresql-rhel9-fbxws 22080:80
```

