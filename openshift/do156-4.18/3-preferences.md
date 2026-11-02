# Preferences


```bash
oc get vmcp
NAME                     AGE
alpine                   11h
centos.7                 11h
```

See default t-shirt sizes
```bash
oc describe vmclusterinstancetype/cx1.large
...output omitted...
Spec:
  Cpu:
    Dedicated CPU Placement:  true
    Guest:  8
    ...output omitted...
  Memory:
    Guest:  16Gi
    ...output omitted...
```

```bash
oc describe vmcp rhel.9
...
Spec:
  Devices:
    Preferred Disk Bus:                  virtio
    Preferred Disk Dedicated IO Thread:  true
    Preferred Interface Model:           virtio
```


## Bootable Volumes

Sealed golden images that are used as boot sources. 
Admin can toggle `enableCommonBootImageImport` to download common images. That creates a new openshift project `openshift-virtualization-os-images` project. 

```bash
oc get datasources -A
openshift-virtualization-os-images   centos-stream8   10h
```

```bash
oc describe datasource centos-stream9 -n openshift-virtualization-os-images
```


## Create VM

```
virtctl create vm --name foobar \
--instance type m1.large \
--infer-preference \ 
--volume-datasource rhel9  > foobar.yaml

oc apply -f foobar.yaml
```

## Cloud init

```yaml
userData: |
  #cloud-config
  users:
    - default
    - name: devops
      gecos: Ansible account
      sudo: ["ALL=(ALL) NOPASSWD:ALL"]
      groups: wheel,adm,systemd-journal
      ssh_authorized_keys:
        - ssh-rsa AA...vz devops@example.com
  chpasswd:
    list: |
      root:password
      cloud-user:mypassword
      devops:mypassword2
    expire: False
  locale: es_MX.UTF-8
  runcmd:
  - [ systemctl, enable, --now, httpd ]
```

## ssh

virtcl ssh -i ~/.ssh/foobar root@foobar -n namespace