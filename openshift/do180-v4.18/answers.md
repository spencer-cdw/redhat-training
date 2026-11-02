# 2

Log in to the OpenShift cluster and create the cli-review project.


```bash
oc login -u developer -p developer https://api.ocp4.example.com:6443
oc new-project cli-review
```
---

Use the oc command to list the following information for the cluster:

Retrieve the cluster version.

Identify the supported API versions.

Identify the fields for the pod.spec.securityContext object.

```bash
oc version
oc api-versions
pod.spec.securityContext
```

---

From the terminal, log in to the OpenShift cluster as the admin user with the redhatocp password. Then, use the command line to identify the following cluster resources:

List the cluster operators.

Identify the available namespaced resources.

Identify the resources that belong to the core API group.

List the resource types that the oauth.openshift.io API group provides.

List the events in the openshift-kube-controller-manager namespace.

```bash
oc loign -u admin -p redhatocp https://api.ocp4.example.com:6443
oc get clusteroperators
oc api-resources --namespaced
oc api-resources --api-group=''
oc api-resources --api-group='oauth.openshift.io'
oc events -n openshift-kube-controller-manager
```

---
Identify the following information about the cluster services and its nodes:

Retrieve the conditions status of the etcd-master01 pod in the openshift-etcd namespace by using jq filters to limit the output.

List the compute resource usage of the containers in the etcd-master01 pod in the openshift-etcd namespace.

Get the number of allocatable pods for the master01 node by using a JSONPath filter.

List the memory and CPU usage of all pods in the cluster.

Retrieve the compute resource consumption of the master01 node.

Retrieve the capacity and allocatable CPU for the master01 node by using a JSONPath filter.

```bash
oc get -o json pod etcd-master01 -n openshift-etcd | jq .status.conditions
oc adm top pod -n openshift-etcd etcd-master01
oc adm top pod -n openshift-etcd etcd-master01 --containers
oc get node master01 -o json | jq .status.allocatable
oc adm top pods -A --sum
oc adm top node master01
oc get node master01 -o json | jq .status.allocatable
oc adm must-gather --dest-dir /home/student/DO180/labs/cli-review/debugging
oc adm inspect clusteroperator kube-apiserver --dest-dir /home/student/DO180/labs/cli-review/inspect --since 5m
```