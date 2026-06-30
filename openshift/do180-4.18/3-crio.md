# CRI-O

Openshift doesn't use docker or podman, it uses CRIO Engine

```bash
crictl pods
crictl image
crictl inspect
crictl exec
crictl logs
crictl ps
```

## Debug

To debug, ssh to the worker node

Then you must enable host binaries with chroot

Then you can call crictl directly

```bash
oc debug node/master01
chroot /host
crictl ps --name postgresql
```

#### nsenter

nsenter -t 43453 -p -r ps -ef
