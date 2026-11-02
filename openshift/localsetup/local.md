To install openshift local

https://www.redhat.com/en/blog/install-openshift-local

## Setup

Run the OSX Installer, it will add `crc` to your path. 

Run `crc setup`


## Config

```bash
crc config set cpus 8
crc config set memory 16384
crc config view
crc start -p ~/Downloads/pull-secret
```

```bash
Started the OpenShift cluster.

The server is accessible via web console at:
  https://console-openshift-console.apps-crc.testing

Log in as administrator:
  Username: kubeadmin
  Password: UGh69-MfusK-mPUTJ-Tez9g

Log in as user:
  Username: developer
  Password: developer

Use the 'oc' command line interface:
  $ eval $(crc oc-env)
  $ oc login -u developer https://api.crc.testing:6443
```


## Login

`eval $(crc oc-env)`
`oc login -u kubeadmin https://xxxxxxx:6443`
`oc get nodes`


## Questions
- Does OSX use virtsh? 
