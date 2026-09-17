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



## Create vm

Note that the volume comes from the rhel9-mariadb data source is in the openshift-virtualization-os-images namespace. 

This isn't easy to find in the docs, need to look at examples. 

`virtctl create --help | grep -i datasource`

```yaml
echo 'foobar' > developer-password
virtctl create vm \
  --name rhel9-database \
  --namespace accessing-clicreate --memory 5Gi \
  --volume-import type:ds,src:openshift-virtualization-os-images/rhel9-mariadb \
  --user developer --password-file developer-password \
  --ssh-key "$(cat ~/.ssh/lab_rsa.pub)" \
  > rhel9-database.yaml
oc apply rhel9-database.yaml
oc get vm
```


## Edit vm

You can edit vms with `oc edit` command. 
It will open a yaml file in vm, saving will apply changes. 

```bash
oc edit vm foobar
```

If you re reun oc get vm foobar, you'll see a warning message

> "message": "memory updated in template spec to a value lower than what the VM started with",

## Check vm

```bash
oc get vm rhel9-database
oc describe vm foobar
```

## Port Forward

```bash
virtctl port-forward vm/rhel9-database 13306:3306
mysql -h 127.0.0.1 -u devuser -p'developer' --port 13306 sakila
```


## Logs

```bash
oc logs virt-launcher-foobar
```

## Exec

oc exec will get you access, use `--` to specify the entrypoint
```bash
oc exec -it virt-launcher-foobar-pod -n namespace -- /bin/bash
```



## Information commands
```bash
virtctl fslist foobar-vm
virtctl guestinfo foobar-vm
virtctl userlist foobar-vm
```

## Management commands

```bash
virtctl create -name foobar-vm
virtctl start foobar-vm
virtctl pause vm foobar-vm
virtctl unpause vm foobar-vm
virtctl migrate foobar-vm
virtctl restart foobar-vm
```

### Memory Dump

```bash
virtctl vmexport download <vmexport_name> --vm\|pvc=<object_name> \
  --volume=<volume_name> --output=<output_file>
```

## Image uploads

virtctl image-upload dv <datavolume_name> --image-path=</path/to/image> --no-create
virtctl image-upload dv <datavolume_name> --size=<datavolume_size> --image-path=</path/to/image>