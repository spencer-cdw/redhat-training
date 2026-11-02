# kubectl

## Install Ubuntu

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L \
  -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L \
-s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check

sudo install -o root -g root -m 0755 kubectl \
  /usr/local/bin/kubectl
```

## Install RHEL

```bash
[user@host ~]$ cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://pkgs.k8s.io/core:/stable:/v1.31/rpm/
enabled=1
gpgcheck=1
gpgkey=https://pkgs.k8s.io/core:/stable:/v1.31/rpm/repodata/repomd.xml.key
EOF
[user@host ~]$ sudo yum install -y kubectl
```


kubectl create
kubectl explain pod

# OC
## OC Auth

oc login -u username api-url

e.g.
`oc login -u admin https://api.ocp4.example.com:6443`

You can also login with a token
```bash
open https://oauth-openshift.apps.cluster-url/oauth/token/request 
oc login --token=your-token --server=cluster-url
```

Or login with web

`oc login --web https://example.com:6443`


## OC Projects

projects are kubernetes namespaces with additional annotations (labels)

oc new-project myapp

Set the current context to a project

oc project foobaf


## OC Info

oc cluster-info

## OC API Version

oc api-versions

## OC Operators

oc get clusteroperator

## OC Get

oc get pod
oc get all
oc describe pod xxxxxxxx
oc explain pods.spec.containers.resources
oc create -f pod.yaml
oc status
oc delete pod foobar
oc get pods -n foobar
oc api-resources --namespaced=true --api-group apps --sort-by name
oc logs <podname> -c <container-name>
oc debug job/test --as-user=1000000
oc adm must-gather
oc get operators
oc get clusteroperators

## Cheat Sheet

get events
`oc get events -n openshift-kube-controller-manager`

get logs
`oc logs alertmanager-main-0 -n openshift-monitoring`

get all resources
`oc get all -n openshift-monitoring`

get utilization
`oc adm top pods etcd-master01 -n openshift-etcd --containers`
`oc adm top node`
`oc describe node master01`
`oc adm top pods -A --sum`