# kustomize

base vs overlays

When using kustomize, use the -k option to 'render' the new yaml

oc apply -f 
oc apply -k


```
base
├── configmap.yaml
├── deployment.yaml
├── secret.yaml
├── service.yaml
├── route.yaml
└── kustomization.yaml
overlays
└── development
    └── kustomization.yaml
└── testing
    └── kustomization.yaml
└── production
    ├── kustomization.yaml
    └── patch.yaml
```

see [./kustomization.yaml](./kustomization.yaml) for example of what kustomize file looks like

Fields

```bash
namespace
namePreifx
nameSuffix
labels
commonAnnotations
```


## View and Deploy

`oc kustomize overlays/production`

or

`oc apply -k kustomization-directory --dry-run=server`

```yaml
metadata:
  labels:
    env: prod
    name: frontend-prod
spec:
  replicas: 5
    selector:
  matchLabels:
      app: frontend
      env: prod
```

## Secrets

You can see the secret reference with `oc get deployment foobar -o json`

The reference is stored in the spec 'envFrom'
```bash
oc get deployment exoplanets \
-o jsonpath='{.spec.template.spec.containers[0].envFrom}{"\n"}'
```

You can get values of secrets with oc extract

`oc extract secret/db-secrets-55cbgc8c6m --to -`


Secrets shouldn't be stored in git, should pull from a .env file or secret manager

```yaml
secretGenerator:
- name: database-creds
  envs:
  - .env.secret
``` 