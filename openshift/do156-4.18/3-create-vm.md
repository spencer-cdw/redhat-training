# Create vm


oc apply -f foobar.yaml

### Create ssh key

`oc create secret generic authorized-keys --from-file=key=~/.ssh/id_rsa.pub`

or create from yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: authorized-keys
data:
  key: "c3No...eQo="
```

### Generate yaml

Use virtctl to generate yaml file

```bash
virtctl create vm --name foobar --namespace production --memory=5Gi
```

Or to use existing data source

```bash
virtctl create vm --name foobar --namespace production --volume-import type:ds,name:postgresql-dv,src:postgresql-project/postgresql-dv > vm.yaml
```

Add user/password at boot time
```bash
virtctl create vm --name postgresql-rhel9 \
  --namespace production \
  --user vm-admin --password-file password_file.txt
```

Add ssh key at boot time
```bash
virtctl create vm --name postgresql-rhel9 \
  --namespace production \
  --ssh-key "ssh-rsa C5d3...8Pjb mysshkey" --user vm-admin
```
or
```bash
virtctl create vm --name postgresql-rhel9 \
  --namespace production \
  --access-cred=src:authorized-keys,method:nocloud \
  --user vm-admin
```
or with dynamic ssh injection
```bash
virtctl create vm --name postgresql-rhel9 \
  --namespace production \
  --access-cred=src:authorized-keys,method:ga \
  --user vm-admin
```

## Modify vm

Need to reboot with virtctl after editing
```bash
oc edit vm foobar
virtctl restart foobar
```

## Stop vm

```bash
virtctl stop foobar
```

## Access console of vm

```bash
virtctl console foobar
```

vnc

```bash
virtctl vnc foobar
```


## Access vm over ssh

```bash
virtctl ssh -i .ssh/lab --username admin foobar
```

## Access vm with port forward\

You can use either virtctl or oc. This is one of the few times that virtctl is smoother since it is vm aware, whereas `oc` is actually working lower level. 

Note that you must open a second terminal and leave the `virtctl port-forward` or `oc port-forward` open
Note that port forwarding goes through the api server so you shouldn't pump logs or a ton of information through it or use RDP. 

localport:vmport
```bash
virtctl port-forward vm/postgresql-rhel9 22080:80
```

```bash
oc get pods | grep -i virt-launcher
oc port-forward pod/virt-launcher-postgresql-rhel9-abcd 22080:80
```



## GUI (VNC/RDP/SPICE)

[remote-viewer](https://linuxcommandlibrary.com/man/remote-viewer) Windows/Linux
[virt-viewer](https://virt-manager.org/download) Windows/Linux

[TigerVNC](https://tigervnc.org/)
TightVNC

## Oc exec

You can also oc exec into the pod, just use `-- /bin/bash` to specify entrypoint

oc exec -it virt-launch-pod-name -n namespace -- /bin/bash