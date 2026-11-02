https://rol.redhat.com/rol/app/courses/do280-4.22/pages/ch01s02

lab start declarative-manifests


## Create project

```bash
oc new-project declarative-manifests
cd ~/D0280/labs
git clone https://git.lab.example.com/developer/declarative-manifests.git
cd declarative-manifests
```

```bash
git checkout v1.0
oc apply -f . --validate=true --dry-run=server
oc apply -f .
oc get deployments,pods
oc get routes -l app=exoplanets
```

```bash
git checkout v1.1.0
oc diff -f .
oc apply -f .
oc get deployments,pods
```

```bash
git checkout v1.1.1
oc diff -f .
oc get pods
od apply -f .
oc get pods
oc get deployments
oc rollout restart deployment/database
oc get pods
oc get deployment exoplanets -o yaml
oc delete -f .
```

Note that the app might crash loop backoff because the database secrets are updated. 
Ues the `oc rollout restart deployment/database` to restart it. (Probably going to be in the exam)
If its still not restarting try `oc rollout restart deployment/exoplanets` to restart the web server in addition to the database


```bash
lab finish declarative-manfests
```


## Secrets

kustomization.yaml files can have a secretGenerator field which automates the base64 encoding

```yaml
secretGenerator:
- name: secret-1
  files:
    - password.txt
- name: secret-2
  envs:
    - secret-mysql.env
- name: secret-3
  literals:
    - MYSQL_DB=mysql
    - MYSQL_PASS=root
```

Speical fields

- generatorOptions
- configMapGenerator
- secretGenerator

