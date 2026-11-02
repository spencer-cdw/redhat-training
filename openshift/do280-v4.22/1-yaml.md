# YAML

Declarative vs Imperative


### Create yaml

oc create deployment hello-openshift -o yaml \
--image quay.io/redhattraining/hello-world-nginx:v1.0 \
--save-config \
--dry-run=client \
> ~/my-app/example-deployment.yaml


oc create -f https://example.com/example-apps/deployment.yaml



### Compare 

oc diff


```bash
oc diff -f foobar.yaml
```

To deploy use `oc rollout`

```bash
oc rollout restart deployment foobar
```


oc create will give an error if resources already exist. 
oc apply compares 3 sources to determine how to apply

oc apply
- manifest file
- live configuration of the resources in the cluster
- configuration that is stored in the `last-applied-configuration` annotation

#### Saving configs

use `--save-config` in `oc create --save-config` to save for future `oc apply` operations

### Patching

You can pass inline json or a file to modify a resource

```bash
oc patch deployment hello -p '{"spec":{"template":{"spec":{"containers":[{"name": "hello-rhel10","resources": {"requests": {"cpu": "100m"}}}]}}}}'
```

`oc patch deployment hello --patch-file foobar.yaml`

```yaml
spec:
  template:
    spec:
      containers:
        - name: hello
          volumeMounts:
            - name: www
              mountPath: /usr/share/nginx/html/
      volumes:
        - name: www
          persistentVolumeClaim:
            claimName: nginx-www
```