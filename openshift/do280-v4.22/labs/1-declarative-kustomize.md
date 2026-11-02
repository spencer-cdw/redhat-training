https://rol.redhat.com/rol/app/courses/do280-4.22/pages/ch01s04

lab start declarative-kustomize

```bash
cd ~/DO280/labs/declarative-kustomize
git clone https://git.lab.example.com/developer/exoplanets.git
git checkout v1.1.0
cd exoplanets
tree
```

Deploy v1.1.0
```bash
oc login -u developer -p developer https://api.lab.example.com:6443
oc new-project declarative-kustomize
oc apply -k base
oc get all
```

```bash
git checkout v1.1.1
git show
cd base/exoplanets/deployment.yaml
oc apply -k base
oc get all
```

```bash
git checkout v1.1.2
git show
cat base/kustomization.yaml
oc extract secret/db-secrets-xxxxx --to -
oc apply -k base
oc get all
```

Examine the deployment and observe the new secret

```bash
oc get deployment exoplanets \
-o jsonpath='{.spec.template.spec.containers[0].envFrom}{"\n"}'
```

```bash
git checokut v1.1.3
git show
oc apply -k overlays/production
oc get all
```

```bash
oc delete -k base
```

lab finish declarative-kustomize