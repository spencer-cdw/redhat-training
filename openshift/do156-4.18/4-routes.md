# Routes

Openshift Routes predate kubernetes ingresss controllers. 

While ingress is more native, routes still support tls-reencryption which not all k8s ingresss supports. 


Expose existing service
```bash
oc create route foobar --service web --hostname api.apps.example.com
```

Create a service and route
```bash
virtctl expose vm prod-web --name web --type ClusterIP --port 80 --target-port 8080
```

Create route
```bash
oc expose service/hello-world
```



### Why 3

oc expose = generic to create service or route for service or pod
oc create route = direct, manually defines route for existing service
virtcl expose vm = Specific for vms 