# Networking

Openshift has a CNO Cluster Network Operator for managing SDN

![](https://static.ole.redhat.com/rhls/courses/do156-4.18/images/network/services/assets/lecture-pod-sdn.svg)


![](https://static.ole.redhat.com/rhls/courses/do156-4.18/images/network/services/assets/lecture-pod-service-sdn.svg)

Network address space

```bash
oc get network/cluster -o yaml
```


## Labels

The router allows traffic to VMs by labels. `.spec.template.metadata.labels ` is the only location that openshift propigates to virt-launcher. Other kubernetes native labels are not copied. 

**Warning:** Editing virtual machine resource with `oc edit vm foobar` does not propigate changes to the virt-launcher pod resoruces. YOu must restart the vm to re-create the resources

**Warning:** VM migration creates a new virt-launcher pod, so only labels defined in spec.template.metadata.labels are automatically applied to the replacement pod.


## Domains

openshift DNS operator manages an internal DNS service. It controls the `svc.cluster.local` domain. 

`servicename.namespace.svc.cluster.local`

It automatically creates /etc/resolv.conf inside each pod


## Multi-Homed network

All pods must be on the default pod network. You can optionally add a second network adapter that uses the Multus CNI plugin

![https://static.ole.redhat.com/rhls/courses/do156-4.18/images/network/multus/assets/lecture-multus.svg]

To attach additionaol networks, use the `NetworkAttachmentDefinition` CR. 

| NAD | Network Attachment Definiition | 


### CNI Plugins

| bridge | Connect network interfaces to a (shared) phyical network on a host | 
| host-device | Connect pod/vm to host network adapter (exclusive, lowest latency) | 
| ipvlan | Network to allow pods/vm to have unique ip addresses, but share host MAC address. |
| macvlan | Enable pods/vm to communicate with other hosts and their pods/vms by using a physical network interace. Every pod/vm has unique mac address |
| SR-IOV | Enable pods to attach to a virtual function interface on SR-IOV capable hardware | 


`oc get net-attach-def -n multus-test`



## UDN

Multi-Homed networks must have pods/vms on default container network. 
By contrast a UDN (User Defined Network) can be the parimary/only layer2 network

#### UDN Features
- Each UDN can share and have overlapping networks. (e.g. dev/prod share isolated ip addresses)
- IP Addresses can persist across node migrations and restarts. 

#### UDN Constraints
Because they are isolated from pod network, there are limitations
- VMs/Pods on UDN can not access OpenShift image registry (or any other service on the default container network)
- Can't `virtctl ssh` to vm
- Can't port forward with `oc port-forward`
- Can't use headless services to access VM
- Can't define readiness/liveness probe
- No DNS for ip
- Only 1 UDN per namespace