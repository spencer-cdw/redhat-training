## Load Balancing

Ingress + Route can not do all protocols

❌ text based protocols
- smtp
- pop3
- imap
❌ binary protocols
- ssh
- LDAP
- MYSQL


Other Options

- Node ports (Opens a static port on all hosts) port number between 30000 -> 32768
- Load Balancer


### Cloud Load Balancers

If on AWS, GCP, IBM it will use a cloud native load blancer

### MetalLB Operator

If on bare metal, will use metallb LB

Operates on layer 2 (ARP) and layer 3 (BGP)

To configure it
1. Give MetalLB an ip address range to controll the ip addreses

Metallb defaults to the metallb-system project/namespace

`oc get metallb -n metallb-system`

#### Virtctl + Loadbalancer

To expose though the load balancer use `--type=LoadBalancer` with virtctl

`virtctl expose vm foobar --name=foobar-ssh --type=LoadBalancer --port=22 --target-port=22`

Or same thing as yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: vm1-ssh
spec:
  ports:
  - nodePort: 30551
    port: 22	1
    protocol: TCP
    targetPort: 22	2
  selector:
    vm.kubevirt.io/name: vm1 3
  sessionAffinity: None
  type: LoadBalancer 4
```

## Over LoadBalancer

You can enable ssh over load balancer through the GUI

![](https://static.ole.redhat.com/rhls/courses/do156-4.18/images/network/lb/assets/enabling-ssh-over-loadbalancer.png)



## Metal LB

To get the range of ip addresses query the metallb Custom Resource Definition
```bash
oc api-resources --api-group=metallb.io
oc get ipaddresspool
NAME                        AUTO ASSIGN   ...   ADDRESSES
gls-metallb-ipaddresspool   true          ...   ["192.168.50.20-192.168.50.40"]
```

## Questions

The exercies has the user do a migration after enabling ssh over load blancer
https://rol.redhat.com/rol/app/courses/do156-4.18/pages/ch04s10
Is that reuriqed always or just in this example? 