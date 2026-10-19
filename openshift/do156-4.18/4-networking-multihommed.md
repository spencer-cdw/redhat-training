# Mutlihomed 

Cluster administrators use the Kubernetes NMState operator to manage the network configuration of each node.

The pod network gives VMs ephemerial IP addresses. If you need a static ip, it must be assigned on the secondary interface.


- NodeNetworkConfigurationPolicy (NNCP)
- NodeNetworkConfigurationEnactment (NNCE) 
- network attachment definition (NAD)

NNCP can create linux bridges, vSwitches, bonds

```yaml
apiVersion: nmstate.io/v1
kind: NodeNetworkConfigurationPolicy
metadata:
  name: br0-ovs-bridge-policy 1
spec:
  nodeSelector:
    node-role.kubernetes.io/worker: "" 2
  desiredState:
    interfaces:
    - name: br0 3
      bridge:
        options: {}
        port:
        - name: ens4 4
      ipv4:
        dhcp: "true"
        enabled: "true"
      state: up
      type: ovs-bridge 5
    ovn:
      bridge-mappings:
      - bridge: br0
        localnet: br0-network
        state: present
```

After adding a secondary network interface to a machine, you must migrate it to complete the changes. 
You must have guest agent running in vm to register ip on console