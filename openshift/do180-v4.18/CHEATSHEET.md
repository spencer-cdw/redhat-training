## Login

oc login -u developer -p developer
oc login -u admin -p redhatocp

## Pod Management

```bash
oc delete foobar
oc get pod ubi9-user
oc exec -it ubi9-user -- /bin/bash
oc run ubi9-date --restart 'Never' \
  --image registry.ocp4.example.com:8443/ubi9/ubi -- date
oc attach ubi9-command -it
oc logs ubi9-command --tail=10
oc get pod ubi9-command -o json | \
  jq .status.containerStatuses[].name
oc debug node/master01
```


## Debug

To debug you need to chroot on the host. Once you chroot you can run low level commands like `crictl`

```bash
oc login -u admin -p redhatocp
oc debug node/master01
chroot /host
```

```bash
crictl ps --name ubi9-command -o json | jq -r .containers[0].id
CID=$(crictl ps --name ubi9-command -o json | jq -r .containers[0].id)
crictl inspect $CID | grep pid
lsns -p $PID
```

