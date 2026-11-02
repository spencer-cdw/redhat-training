# Ingress

Openshift supports the following ingress types

| NodePort | Used for non-http workloads, exposes direct TCP port | 
| LoadBalancer | MetalLB operator for non-cloud, External IP for Cloud hosted clusters | 
| Ingress Controller | HTTP,HTTPS,TLS using SNI |


### Ingress Controller

RedHat OSC provides `route` resource for http,https traffic (haproxy under the hood)
Kubernetes provides `ingress` resoruce that is similar to OC route but offers TLS reencryption, TLS passthrough, blue/green deployements


Openshift route naming convention:

`routename-namespace.default_domain`

e.g.

`intranet-prod.mycompany.com`


## Create Routes

```bash
oc expose service/web
route.route.openshift.io/web exposed
```

or

```bash
oc expose service/web --name foobar --hostname web-production.apps.mycompany.com
```

`oc get route foobar`

Path based routes

`oc expose service/static --path=/fobar --hostname=foobar.apps.mycompany.com`


You can also do the same thing with virctl

```bash
virtctl expose vm foobar --name=foobar --type=ClusterIP --port=80 --target-port-80
```

And view the endpoitn

```bash
oc get vmi,endpoints hello-web
```


### Encrypted Routes

| Edge | 
| Passthrough | 
| Re-Encryption | 


