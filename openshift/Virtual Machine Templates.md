# Vritual Machine Templates

https://rol.redhat.com/rol/app/courses/do156-4.18/pages/ch03s03


CX | compute exclusive
GN | GPU Nvidia
M | Memory
N | Network (DPDK, VNF)
O | Overcommitted (Burt, Spot instances)
U | Universal | General Purpose



## Commands

Get vm types

```bash
oc get vmclusterinstancetypes
cx1.2xlarge
```

Get info about templates
```bash
oc describe vmclusterinstancetype/cx1.large
Spec:
  Cpu:
    Guest: 8
```


## Preferences Defaults

VMP Virtual Machine Preference
VMCP Virtual Machine Cluster Preferences

Cluster wide t shirt sizing defaults

To get preference defaults

```bash
oc get vmcp
```

```bash
oc describe vmcp rhel.9
```


## Golden Images (Datasource)

Openshift calls golden images Bootable Volumes. 

Default namespace for OS provided images is `openshift-virtualization-os-images`. It includes images like rhel10 and rhel9

```bash
oc get datasources -A
NAMESPACE                            NAME             AGE
openshift-virtualization-os-images   centos-stream8   10h
```

## Create vm with virtctl
virtctl can be used to generate yaml

```bash
virtctl create vm \
--name foobar \
--instancetype m1.large \
--infer-preference \ 
--volume-datasource rhel9 > foobar.yaml
```


## Cloud-init

Can be done with a form or a script

Form is just username and password

![](https://static.ole.redhat.com/rhls/courses/do156-4.18/images/accessing/creating/assets/cloudinit-form.png)

```yaml
userData: |
  #cloud-config
  users:
    - default   1
    - name: devops  2
      gecos: Ansible account
      sudo: ["ALL=(ALL) NOPASSWD:ALL"]  3
      groups: wheel,adm,systemd-journal
      ssh_authorized_keys:  4
        - ssh-rsa AA...vz devops@example.com
  chpasswd:
    list: |
      root:password
      cloud-user:mypassword
      devops:mypassword2
    expire: False 5
  locale: es_MX.UTF-8  6
  runcmd:
  - [ systemctl, enable, --now, httpd ] 7
```

#### RedHat Subscription

Can enable red hat subscriptions with the rh_subscription module

```yaml
rh_subscription:
  activation-key: example_key
  org: 12345
  auto-attach: True
```


### Ssh keys

You can store an ssh key in the secret store, or provide one at runtime

![](https://static.ole.redhat.com/rhls/courses/do156-4.18/images/accessing/creating/assets/vm-ssh-key-existing-selected.png)

To list keys

```bash
oc describe secret/lab-grading-key -n accessing-creating
```


To ssh with virtctl

```bash
virtctl ssh -i ~/.ssh/foobar rhel@server1 -n accessing-creating
```


## Commands

```bash
oc login -u developer -p developer https://api.ocp4.example.com:6443
oc project foobar #switches to project
oc get vms
oc describe secret/lab-key #ssh key
```

```bash
virtctl ssh -i ~/.ssh/lab_rsa --username developer hello-world-template
```



## Questions

- [] Why does it need virtctl infront of the ssh command? 
Because vms are created on the pod network with a masquerade interface, it does not get a routable ip


## Notes
- Do not use virtssh for high bandwidth ssh sessions since it puts burden on the API